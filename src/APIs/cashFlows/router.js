const express = require('express');
const validate = require('express-validation');
const controller = require('./controllers');
const validations = require('./validations');

const router = express.Router();

router
  .route('/')
  .get(validate(validations.list), controller.common.list)
  .post(
    validate(validations.create),
    controller.blockNotFoundAccount,
    controller.blockNotFoundCashFlowDescription,
    controller.updateAccountCurrentValue,
    controller.common.create,
    controller.undoUpdateAccountCurrentValueOnError
  );

router
  .route('/:id')
  .get(
    validate(validations.get),
    controller.common.load('id'),
    controller.common.get
  )
  .put(
    validate(validations.replace),
    controller.common.load('id'),
    controller.blockNotFoundAccount,
    controller.blockNotFoundCashFlowDescription,
    controller.updateAccountCurrentValue,
    controller.common.replace,
    controller.undoUpdateAccountCurrentValueOnError
  )
  .delete(
    validate(validations.delete),
    controller.common.load('id'),
    controller.loadCurrentAccount,
    controller.updateAccountCurrentValue,
    controller.common.delete,
    controller.undoUpdateAccountCurrentValueOnError
  );

module.exports = router;
