import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/assistances", async (req, res) => {
  const assistance = await prisma.assistance.findMany();
  res.json({
    status: "success",
    data: assistance,
  });
});

router.get("/assistances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const assistance = await prisma.assistance.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          student: true,
          course: true,
          assistanceCategory: true,
        },
      });
      if (assistance) {
        res.json({
          status: "success",
          data: assistance,
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

router.get("/assistances-with-qr/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const assistance = await prisma.assistance.findMany({
        where: {
          qrId: Number(id),
        },
        include: {
          student: true,
          course: true,
          assistanceCategory: true,
        },
      });
      if (assistance) {
        res.json({
          status: "success",
          data: assistance,
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

router.get("/assistances-with-studentId/:id/:courseId", async (req, res) => {
  try {
    const { id, courseId } = req.params;
    const assistance = await prisma.assistance.findMany({
      where: {
        studentId: id,
        courseId: Number(courseId)
      },
      include: {
        student: true,
        course: true,
        assistanceCategory: true,
      },
    });
    if (assistance) {
      res.json({
        status: "success",
        data: assistance,
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

router.put("/assistances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const assistance = await prisma.assistance.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });
      if (assistance) {
        res.json({
          status: "success",
          data: assistance,
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

router.post("/assistances", async (req, res) => {
  try {
    const result = await prisma.assistance.create({
      data: { ...req.body },
    });
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error,
    });
  }
});

type Assist = {
  courseId: number;
  studentId: string;
  qrId: number;
};

router.post("/assist/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const deviceOnQr = await prisma.deviceOnQr.update({
      where: {
        token: token,
      },
      data: {
        used: true,
      },
    });
    if (deviceOnQr) {
      const data: Assist = req.body;
      await prisma.courseOnStudent.updateMany({
        where: {
          AND: [
            { courseId: data.courseId },
            {
              studentId: data.studentId,
            },
          ],
        },
        data: {
          assistances: { increment: 1 },
        },
      });
      await prisma.assistance.updateMany({
        where: {
          AND: [
            {
              qrId: data.qrId,
            },
            {
              courseId: data.courseId,
            },
            {
              studentId: data.studentId,
            },
          ],
        },
        data: {
          assistanceCategoryId: 1,
        },
      });
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
    console.log(error);
    res.json({
      status: "error",
      message: error,
    });
  }
});

export default router;
