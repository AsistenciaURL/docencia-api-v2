import { PrismaClient } from "@prisma/client";
import express from "express";

import CourseRoutes from "./routes/courses";
import ProfessorRoutes from "./routes/professors";
import StudentRoutes from "./routes/students";
import DeviceRoutes from "./routes/devices";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(CourseRoutes);
app.use(ProfessorRoutes);
app.use(StudentRoutes);
app.use(DeviceRoutes);

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    data: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// #6
app.listen(8000, () =>
  console.log("REST API server ready at: http://localhost:8000")
);
