import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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