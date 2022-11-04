import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/professors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await prisma.professor.findUnique({
      where: {
        id: id,
      },
      include: {
        courses: true,
      },
    });
    if (professor) {
      res.json({
        status: "success",
        data: professor,
      });
    } else {
      res.json({
        status: "error",
        data: professor,
        message: "Not found",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});

export default router;
