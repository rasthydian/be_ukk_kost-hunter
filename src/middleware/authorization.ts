import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.headers.authorization;
    const [bearer, token] = header ? header.split(" ") : [];

    if (!token || bearer !== "Bearer") {
      res.status(401).json({ message: "Token not provided" });
      return;
    }

    const signature = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, signature) as JwtPayload;

    // simpan user yang sudah diverifikasi
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};

const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: `Access denied. Role ${user.role} is not allowed.`,
      });
    }

    next();
  };
};

export { verifyToken, authorizeRole };
