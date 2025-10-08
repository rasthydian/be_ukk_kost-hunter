import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

/** CREATE Kos */
export const createKos = async (req: Request, res: Response) => {
  try {
    const { name, address, pricePerMonth, gender } = req.body;
    const user = (req as any).user; // dari verifyToken

    const newKos = await prisma.kos.create({
      data: {
        name,
        address,
        pricePerMonth,
        gender,
        userId: user.id,
      },
    });

    res.status(201).json({
      message: "Kos created successfully",
      data: newKos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** GET ALL Kos */
export const getAllKos = async (req: Request, res: Response) => {
  try {
    const kosts = await prisma.kos.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        images: true,
        facilities: true,
      },
    });

    res.status(200).json({ success: true, data: kosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** GET Kos by ID */
export const getKosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const kos = await prisma.kos.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        images: true,
        facilities: true,
        reviews: true,
      },
    });

    if (!kos) return res.status(404).json({ message: "Kos not found" });

    res.status(200).json({ success: true, data: kos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** UPDATE Kos */
export const updateKos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, pricePerMonth, gender } = req.body;

    const kos = await prisma.kos.findUnique({ where: { id } });
    if (!kos) return res.status(404).json({ message: "Kos not found" });

    const updatedKos = await prisma.kos.update({
      where: { id },
      data: { name, address, pricePerMonth, gender },
    });

    res.status(200).json({
      message: "Kos updated successfully",
      data: updatedKos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** DELETE Kos */
export const deleteKos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const kos = await prisma.kos.findFirst({ where: { id } });
    if (!kos) return res.status(404).json({ message: "Kost not found" });

    await prisma.kos.delete({ where: { id } });

    res.status(200).json({ message: "Kos deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** UPLOAD GAMBAR KOS */
export const uploadKosImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }


    const oldImages = await prisma.kosImage.findMany({
      where: { kosId: id },
    });

    for (const img of oldImages) {
      const filePath = path.join(__dirname, "../public/uploads/kos", img.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }


    await prisma.kosImage.deleteMany({
      where: { kosId: id },
    });


    const newImages = files.map((file) => ({
      file: file.filename,
      url: `/uploads/${file.filename}`,
      kosId: id,
    }));

    await prisma.kosImage.createMany({
      data: newImages,
    });

    return res.status(200).json({
      success: true,
      message: "Images updated successfully",
      data: newImages,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateKosImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const existingKos = await prisma.kos.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingKos) {
      return res.status(404).json({
        success: false,
        message: "Kos not found",
      });
    }


    for (const img of existingKos.images) {
      const filePath = path.join(__dirname, "../../public/uploads/kos", img.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.kosImage.deleteMany({
      where: { kosId: id },
    });


    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const newImages = files.map((file) => ({
      file: file.filename,
      url: `${req.protocol}://${req.get("host")}/uploads/kost/${file.filename}`,
      kosId: id,
    }));

    await prisma.kosImage.createMany({
      data: newImages,
    });

    res.status(200).json({
      success: true,
      message: "Kos images updated successfully",
      data: newImages,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

