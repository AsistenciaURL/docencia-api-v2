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

router.post("/professors", async (req, res) => {
  try {
    const result = await prisma.professor.create({
      data: { ...req.body },
    });
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});

export default router;
