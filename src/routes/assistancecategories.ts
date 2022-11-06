import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/assistance-categories", async (req, res) => {
  const assistanceCategory = await prisma.assistanceCatergory.findMany();
  res.json({
    status: "success",
    data: assistanceCategory,
  });
});

router.get("/assistance-categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (Number(id)) {
        const assistanceCategory = await prisma.assistanceCatergory.findUnique({
          where: {
            id: Number(id),
          },
          include:{
            assistances : true
          }
        });
        if (assistanceCategory) {
          res.json({
            status: "success",
            data: assistanceCategory,
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
  

router.put("/assistance-categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(Number( id )){
        const assistanceCategory = await prisma.assistanceCatergory.update({
          where: {
            id: Number(id),
          },
          data: {
            ...req.body,
          },
        });
        if (assistanceCategory) {
          res.json({
            status: "success",
            data: assistanceCategory,
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

router.post("/assistance-categories", async (req, res) => {
  try {
    const result = await prisma.assistanceCatergory.create({
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
