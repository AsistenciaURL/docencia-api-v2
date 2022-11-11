import express from "express";

import CourseRoutes from "./routes/courses";
import ProfessorRoutes from "./routes/professors";
import StudentRoutes from "./routes/students";
import DeviceRoutes from "./routes/devices";
import QrRoutes from "./routes/qrs";
import AssistancecatergoriesRoutes from "./routes/assistancecategories";
import AssistanceRoutes from "./routes/assistances";
import ValidateRoutes from "./routes/validate";
import cors from "cors";
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
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

app.listen(process.env.PORT, () =>
  console.log("Servido escuchando en el la dirección: http://localhost:" + process.env.PORT)
);

export default app;
