const Card = require("../models/card");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Не удалось создать карточку"));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточки с таким ID не существует"));
      }
      if (req.user._id !== card.owner._id.toString()) {
        next(new ForbiddenError("Невозможно удалить чужую карточку"));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Некорректный id карточки"));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточки с таким ID не существует" });
      }
      return res.send(card);
    })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError("Карточки с таким ID не существует"));
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточки с таким ID не существует" });
      }
      return res.send(card);
    })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError("Карточки с указанным ID не существует"));
      }
      return res.send(card);
    })
    .catch(next);
};
