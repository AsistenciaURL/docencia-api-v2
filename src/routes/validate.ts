import { PrismaClient } from "@prisma/client";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const router = express.Router();

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y) * 100000;
}

router.post("/validate/:id", async (req, res) => {
  const data = req.body;

  if (
    data.longitude === undefined ||
    data.latitude === undefined ||
    data.deviceId === undefined
  ) {
    res.json({
      status: "error",
      message: "QR inválido",
    });
    return 0;
  }

  try {
    const { id } = req.params;
    if (Number(id)) {
      const qr = await prisma.qr.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          devices: true,
        },
      });

      if (qr) {
        const distance = getDistance(
          qr.latitude,
          qr.longitude,
          data.latitude,
          data.longitude
        );
        console.log(distance)
        if (distance <= 300) {
          const currentDate = new Date();
          // CAMBIAR EL MAYOR A MENOR
          if (currentDate < qr.limitDate) {
            const isScanned = qr?.devices?.some(
              (device) => device.deviceId === data.deviceId
            );
            if (!isScanned) {
              const token = uuidv4();
              await prisma.qr.update({
                where: {
                  id: Number(id),
                },
                data: {
                  devices: {
                    create: [
                      {
                        deviceId: data.deviceId,
                        token,
                      },
                    ],
                  },
                },
              });
              res.json({
                status: "success",
                message: "Validado",
                data: token,
              });
              return 0;
            }
          }
        }
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
    res.json({
      status: "error",
      message: "Invalid QR",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});

router.get("/token/:id", async (req, res) => {
  const { id } = req.params;
  const token = await prisma.deviceOnQr.findUnique({
    where: {
      token: id,
    },
  });
  if (token) {
    if (token.used === false) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "error",
      });
    }
  } else {
    res.json({
      status: "error",
    });
  }
});

export default router;
