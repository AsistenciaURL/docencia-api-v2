import { PrismaClient } from "@prisma/client";
import express from "express";

import CourseRoutes from "./routes/courses";
import ProfessorRoutes from "./routes/professors";
import StudentRoutes from "./routes/students";
import DeviceRoutes from "./routes/devices";
import QrRoutes from "./routes/qrs";
import AssistancecatergoriesRoutes from "./routes/assistanceCategories";
import AssistanceRoutes from "./routes/assistances";
import ValidateRoutes from "./routes/validate";
import cors from "cors";
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://docencia-web-wip.vercel.app/",
  })
);

app.use(CourseRoutes);
app.use(ProfessorRoutes);
app.use(StudentRoutes);
app.use(DeviceRoutes);
app.use(QrRoutes);
app.use(AssistancecatergoriesRoutes);
app.use(AssistanceRoutes);
app.use(ValidateRoutes);

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    data: null,
    message: `Esta ruta no existe: ${req.path}`,
  });
});

// #6
app.listen(process.env.PORT, () =>
  console.log("Servido escuchando en el la dirección: http://localhost:" + 8000)
);

export default app;
