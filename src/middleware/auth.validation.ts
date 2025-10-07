import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/** Schema untuk Register */
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required().messages({
    "string.pattern.base": "Phone must contain only numbers",
    "any.required": "Phone number is required",
  }),
  role: Joi.string().valid("USER", "OWNER", "ADMIN").default("USER"),
});

/** Schema untuk Login */
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  name: Joi.string().min(3).optional(),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

/** Middleware validator untuk Register */
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

/** Middleware validator untuk Login */
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
