import { NextFunction, Request, Response } from "express";
import Joi from "Joi"

const createSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const createValidation = async(
    req: Request,
    res: Response,
    next: NextFunction

) : Promise<any> => {
    const validation = createSchema.validate(req.body)
    if(validation.error){
       
        res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        })
    }
    next()
}

const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const authValidation = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    const validation = authSchema.validate(req.body)
    if(validation.error){
        res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        })
    }
    next()
}
export {createValidation, authValidation}