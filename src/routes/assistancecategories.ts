import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/assistancecategories", async (req, res) => {
  const assistancecategory = await prisma.assistanceCatergory.findMany();
  res.json({
    status: "success",
    data: assistancecategory,
  });
});

router.get("/assistancecategories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (Number(id)) {
        const assistancecategory = await prisma.assistanceCatergory.findUnique({
          where: {
            id: Number(id),
          },
          include:{
            assistances : true
          }
        });
        if (assistancecategory) {
          res.json({
            status: "success",
            data: assistancecategory,
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
  

router.put("/assistancecategories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(Number( id )){
        const assistancecategory = await prisma.assistanceCatergory.update({
          where: {
            id: Number(id),
          },
          data: {
            ...req.body,
          },
        });
        if (assistancecategory) {
          res.json({
            status: "success",
            data: assistancecategory,
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

router.post("/assistancecategories", async (req, res) => {
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
