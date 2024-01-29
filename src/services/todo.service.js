import { v4 as uuidv4 } from 'uuid';
import { sequelize } from './db.js';
import { DataTypes, Op } from 'sequelize';

export const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'todos',
  updatedAt: false,
  createdAt: false,
});

export const normalize = ({ id, title, completed, priority }) => {
  return { id, title, completed, priority };
}

export const getAll = async () => {
  const result = await Todo.findAll({ order: ['createdAt'] });

  return result;
};

export const getById = async (id) => {
  return Todo.findByPk(id);
};

export const create = (title, priority = 1) => {
  const id = uuidv4();

  return Todo.create({ id, title, priority });
};

export const update = async ({ id, title, completed, priority }) => {
  await Todo.update({ title, completed, priority }, { where: { id } });
};

export const remove = async (id) => {
  Todo.destroy({
    where: {
      id
    }
  });
};

export const removeMany = async (ids) => {
  Todo.destroy({
    where: {
      id: {
        [Op.in]: ids
      }
    },
  })
};

export const updateMany = async (todos) => {
  return await sequelize.transaction(async (t) => {
    for (const { id, title, completed, priority } of todos) {
      await Todo.update(({ title, completed, priority }, { where: { id }, transaction: t }))
    }
  })

  await Todo.bulkCreate(todos, {
    updateOnDuplicate: ['title', 'completed', ['priority']]
  });
}