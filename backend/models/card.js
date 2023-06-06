const mongoose = require('mongoose');
const validator = require('validator');

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '400 Поле "name" должно быть заполнено'],
      minlength: [2, '400 Минимальная длина поля "name" - 2'],
      maxlength: [30, '400 Максимальная длина поля "name" - 30'],
    },
    link: {
      type: String,
      required: [true, '400 Поле "link" должно быть заполнено'],
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: '400 некорректный адрес',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    comments: [{
      text: {
        type: String,
        required: [true, '400 Поле "text" должно быть заполнено'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardsSchema);
