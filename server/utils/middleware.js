import { validationResult, body, query } from "express-validator";

export const validateRequestParams = [
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("filter must be string and not empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("filter must be string and min 3 max 10"),
  query("value")
    .notEmpty()
    .withMessage("value not empty")
    .isString()
    .withMessage("value must be string"),
];

export const validateQueryParams = (req, res, next) => {
  const result = validationResult(req);
  const { filter, value } = req.query;

  if (!filter && !value) {
    return next();
  }

  if (!filter || !value) {
    return res.status(400).send({ errors: result.errors.map((e) => e.msg) });
  }

  if (filter & value) {
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.errors.map((e) => e.msg) });
    }
  }

  next();
};

export const validatePostRequestParams = [
  body("firstname")
    .notEmpty()
    .withMessage("Firstname cannot be empty")
    .isLength({ min: 3, max: 30 })
    .withMessage("Firstname must be between 3 and 30 characters")
    .isString()
    .withMessage("Firstname must be string"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isString()
    .withMessage("Lastname must be string"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be valid"),
];

export const validatePostParams = (request, res, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array().map((e) => e.msg) });
  }
  next();
};
