import express from 'express';
import * as todoController from '../controllers/todo.controller.js';
import cors from 'cors';

const router = express.Router();

router.get('/', cors(), todoController.get);

router.post('/', todoController.create);

router.get('/:id', todoController.getOne);

router.put('/:id', todoController.update);

router.delete('/:id', todoController.remove);

const isAction = (action) => {
  return (req, res) => {
    if (req.query.action === action) {
      next();
      return;
    } else {
      next('route');
    }
  }
}

router.patch('/', isAction('delete'), todoController.removeMany);
router.patch('/', isAction('update'), todoController.updateMany);

export { router };