import {body} from 'express-validator'

export const validateTitle = [
    body('title')
      .isString()
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 30 }).withMessage('Title should not exceed 30 characters')
  ];

 export const validateDescription=[ 
   body('description')
  .isString()
  .notEmpty().withMessage('Description is required')
  .isLength({ min: 1, max: 200 }).withMessage('Description should be between 10 and 200 characters'),
 ]

 export const validateStatus=[body('status')
 .isIn(['To-do', 'In-progress', 'Done']).withMessage('Status must be one of: To-do, In-progress, Done')
 ]