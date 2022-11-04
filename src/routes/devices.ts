import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/devices", async (req, res) => {
  const device = await prisma.device.findMany();
  res.json({
    status: "success",
    data: device,
  });
});

router.get("/devices/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const device = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });
    if (device) {
      res.json({
        status: "success",
        data: device,
      });
    } else {
      res.json({
        status: "error",
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

router.put("/devices/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const device = await prisma.device.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    if (device) {
      res.json({
        status: "success",
        data: device,
      });
    } else {
      res.json({
        status: "error",
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

router.post("/devices", async (req, res) => {
  try {
    const result = await prisma.device.create({
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
