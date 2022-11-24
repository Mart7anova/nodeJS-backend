import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const titleValidator = body('title')
    .trim()
    .isLength({min: 3, max: 30})
    .withMessage('The title must be between 3 and 30 characters')

export const inputValidatorResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    } else {
        next()
    }
}