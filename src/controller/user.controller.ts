import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/** Register User */

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const findEmail = await prisma.user.findFirst({
            where: { email }
        })

        if (findEmail) {
            res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role
            }
        })
        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/** Login User */

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, name, password} = req.body;

        const user = await prisma.user.findFirst({
            where: {email, name}
        })

        if(!user){
            res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordValid){
            res.status(400).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({
            id: user?.id,
            email: user?.email,
            name: user?.name,
            role: user?.role
        },
        process.env.JWT_SECRET || "secret",
        {
            expiresIn: "1h"
        })
        
        res.status(200).json({
            message: "Login successful",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}