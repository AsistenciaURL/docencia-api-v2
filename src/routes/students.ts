import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/students", async (req, res) => {
  const student = await prisma.student.findMany();
  res.json({
    status: "success",
    data: student,
  });
});

router.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
    if (student) {
      res.json({
        status: "success",
        data: student,
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

router.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    if (student) {
      res.json({
        status: "success",
        data: student,
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

router.post("/students", async (req, res) => {
  try {
    const result = await prisma.student.create({
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

router.post("/assign/:id", async (req, res) => {
  try {
    const { courseId } = req.body;
    const { id } = req.params;
    const result = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        courses: {
          create: [
            {
              courseId,
            },
          ],
        },
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

router.post("/unassign/", async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const result = await prisma.courseOnStudent.updateMany({
      where: {
        AND: [
          {
            courseId: courseId,
          },
          {
            studentId: studentId,
          },
        ],
      },
      data: {
        status: "Desasignado",
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

router.post("/assign-existing/", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const existingStudent = await prisma.student.findUnique({
      where: {
        id: studentId
      }
    })

    if (existingStudent === null) {
      throw("Este carnet no pertece a un estudiante registrado en el sistema.")
    }

    const courseOnStudent = await prisma.courseOnStudent.findUnique({
      where: {
        studentId_courseId: {
          courseId: Number(courseId),
          studentId
        }
      }
    })

    if (courseOnStudent !== null) {
      throw("El estudiante ya esta fue asignado al curso.")
    }

    const newCourseOnStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        courses: {
          create: [
            {
              courseId: Number(courseId),
            },
          ],
        },
      },
    });

    if (newCourseOnStudent) {
      res.json({
        status: "success",
        message: "Estudiante asignado correctamente.",
      });
    }
    
  } catch (error) {
    console.log(error)
    res.json({
      status: "error",
      message: error,
    });
  }
});

export default router;
