import { body } from "express-validator";
import { validationResult } from "express-validator";
 
export const validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("name", "Please enter name")
          .notEmpty()
          .withMessage("Please enter name")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 chars long")
       ,
        body('description')  .notEmpty().withMessage('Please enter description') ,
        
      ];
    }
    
  }
};

export const errorProtect = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let extractedErrors = [];
    errors.array().map((err) => {
      extractedErrors.push(err.msg);
    });
    return res
      .status(200)
      .json({ success: false, message: extractedErrors[0] });
  } else {
    next();
  }
};
