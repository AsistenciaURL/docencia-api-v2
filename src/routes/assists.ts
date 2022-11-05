import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/assists", async (req, res) => {
  const assistance = await prisma.assistance.findMany();
  res.json({
    status: "success",
    data: assistance,
  });
});

router.get("/assists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (Number(id)) {
        const assistance = await prisma.assistance.findUnique({
          where: {
            id: Number(id),
          },
          include:{
            student : true,
            course :  true,
            assistanceCategory : true
          }
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
  

router.put("/assists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(Number( id )){
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
    }else{
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

router.post("/assists", async (req, res) => {
  try {
    const result = await prisma.assistance.create({
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
