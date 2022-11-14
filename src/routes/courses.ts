import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/courses", async (req, res) => {
  const course = await prisma.course.findMany({
    include: {
      students: true
    }
  });
  res.json({
    status: "success",
    data: course,
  });
});

router.get("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const course = await prisma.course.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          students: {
            include: {
              student: true,
            },
          },
          qrs: true
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

router.put("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const course = await prisma.course.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
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

router.put("/courses/add-class/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        classTotal: { increment: 1 },
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
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});

router.post("/courses", async (req, res) => {
  console.log(req.body)
  try {
    const result = await prisma.course.create({
      data: { ...req.body },
    });
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.json({
      status: "error",
      message: error,
    });
  }
});

export default router;
