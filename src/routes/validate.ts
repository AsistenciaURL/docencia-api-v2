import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/validate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {

      const course = await prisma.qr.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (course) {
        res.json({
          status: "success",
          data: course,
        });
      } else {
        res.json({
          status: "error",
          message: "Not found",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Invalid id",
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
