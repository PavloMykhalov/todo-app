import * as todoService from '../services/todo.service.js';

export const get = async(req, res) => {
  const todos = await todoService.getAll();

  res.send(todos.map(todo => todoService.normalize(todo)));
};

export const getOne = async(req, res) => {
  const { id } = req.params;

  const item = await todoService.getById(id);

  if (!item) {
    res.sendStatus(404);
    return;
  }

  res.send(todoService.normalize(item));
};

export const create = async(req, res) => {
  const { title, priority } = req.body;

  if (!title) {
    res.sendStatus(422);

    return;
  }

  const todo = await todoService.create(title, priority);

  res.statusCode = 201;

  res.send(todo);
};

export const update = async(req, res) => {
  const { id } = req.params;

  const { title, completed, priority } = req.body;

  const todo = await todoService.getById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  await todoService.update({ id, title, completed: !completed, priority });

  const updatedTodo = await todoService.getById(id);

  res.send(updatedTodo);
};

export const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await todoService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await todoService.remove(id);

  res.sendStatus(204);
};

export const removeMany = (req, res) => {
  if (req.query.action !== 'delete') {
    next();
    return;
  }

  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  if (!ids.every((id) => todoService.getById(id))) {
    throw new Error();
  }

  todoService.removeMany(ids);

  res.sendStatus(204);

  return;
};

export const updateMany = (req, res) => {
  if (req.query.action !== 'update') {
    next();
    return;
  }

  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }

  const errors = [];
  const results = [];

  for (const { id, title, completed } of items ) {
    const todo = todoService.getById(id);
    if (!todo) {
      errors.push({ id, title, completed, error: 'Todo not found'});
    } else {
      const result = todoService.update({ id, title, completed });
      results.push(result);
    }
  }

  res.sendStatus({ errors, results });
  return;
}