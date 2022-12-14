import { PrismaClient } from "@prisma/client";
import express, { query } from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/qrs", async (req, res) => {
  const qr = await prisma.qr.findMany();
  res.json({
    status: "success",
    data: qr,
  });
});

router.get("/qrs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const qr = await prisma.qr.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          course: true,
          devices: {
            include: {
              device: {
                include: {
                  student: true,
                },
              },
            },
          },
        },
      });
      if (qr) {
        res.json({
          status: "success",
          data: qr,
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

router.put("/qrs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const qr = await prisma.qr.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });
      if (qr) {
        res.json({
          status: "success",
          data: qr,
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

router.post("/qrs", async (req, res) => {
  try {
    const data = req.body;
    const result = await prisma.qr.create({
      data: {
        initDate: new Date(data.initDate),
        limitDate: new Date(data.limitDate),
        ...data,
      },
    });
    const updatedCourse = await prisma.course.update({
      where: {
        id: result.courseId,
      },
      data: {
        classTotal: { increment: 1 },
      },
    });

    const courseOnStudent = await prisma.courseOnStudent.findMany({
      where: {
        courseId: updatedCourse.id
      },
    });
    for (const courseStudent of courseOnStudent) {
      if (courseStudent.status === "Asignado") {
        await prisma.assistance.create({
          data: {
            date: result.initDate,
            observations: "Ninguna",
            assistanceCategoryId: 2,
            studentId: courseStudent.studentId,
            courseId: updatedCourse.id,
            qrId: result.id,
          },
        });
      }
    }

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

export default router;
