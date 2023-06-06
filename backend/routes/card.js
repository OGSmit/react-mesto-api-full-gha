const router = require('express').Router();
const { cardBodyValidator, cardIdParamsValidator } = require('../utils/requestValidators');

const {
  getCards, createCard, deleteCardById, likeCard,
  dislikeCard, addComment, deleteComment, getCommentsByCardId,
} = require('../controllers/card');

router.get('/', getCards);

router.post('/', cardBodyValidator, createCard);

router.delete('/:cardId', cardIdParamsValidator, deleteCardById);

router.put('/:cardId/likes', cardIdParamsValidator, likeCard);

router.delete('/:cardId/likes', cardIdParamsValidator, dislikeCard);

router.post('/:cardId/comments', cardIdParamsValidator, addComment);

router.delete('/:cardId/comments/:commentId', deleteComment);

router.get('/:cardId/comments', getCommentsByCardId);

module.exports = router;
