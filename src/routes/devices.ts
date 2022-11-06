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
      include: {
        student: true
      }
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

router.get("/student-device/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const device = await prisma.device.findUnique({
      where: {
        studentId: id,
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

router.get("/device-qr/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const deviceOnQr = await prisma.deviceOnQr.findUnique({
      where: {
        token: token,
      },
      include: {
        device: true,
        qr: true
      }
    });
    if (deviceOnQr) {
      res.json({
        status: "success",
        data: deviceOnQr,
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

router.post("/associate-device/:id", async (req, res) => {
  try {
    const { studentId } = req.body;
    const { id } = req.params;
    const result = await prisma.device.update({
      where: {
        id: id,
      },
      data: {
        studentId
      },
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

router.post("/register", async (req, res) => {
  const { id } = req.body;

  try {
    const existingDevice = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });
    if (existingDevice) {
      res.json({
        status: "success",
        data: existingDevice,
      });
    } else {
      const newDevice = await prisma.device.create({
        data: { ...req.body },
      });
      res.json({
        status: "success",
        data: newDevice,
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
