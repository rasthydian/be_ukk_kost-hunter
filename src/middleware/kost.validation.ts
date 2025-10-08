import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createKosSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(5).required(),
  pricePerMonth: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid("MALE", "FEMALE", "MIXED").required(),
});

export const updateKosSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  address: Joi.string().min(5).optional(),
  pricePerMonth: Joi.number().integer().min(0).optional(),
  gender: Joi.string().valid("MALE", "FEMALE", "MIXED").optional(),
});

export const validateCreateKos = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createKosSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

export const validateUpdateKos = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateKosSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
