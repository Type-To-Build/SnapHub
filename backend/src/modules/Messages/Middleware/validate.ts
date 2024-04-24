import { body } from "express-validator"
import { validationResult } from "express-validator"

export const validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('employer').notEmpty().withMessage('employer is missing'),
        body('freelancer').notEmpty().withMessage('freelancer is missing'),
        body('messageGroup').notEmpty().withMessage('freelancer is missing'),
        body('msg').notEmpty().withMessage('msg is missing'),
      ]
    }

  }
}
export const errorProtect = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let extractedErrors = []
    errors.array().map(err => {
      extractedErrors.push(err.msg)
    })
    return res.status(200).json({ success: false, message: extractedErrors[0] });
  } else {
    next()
  }
};