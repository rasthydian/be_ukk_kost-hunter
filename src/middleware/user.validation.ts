import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/** Validation untuk Update User */
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).optional(),
  role: Joi.string().valid("SOCIETY", "OWNER").optional(),
});

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
