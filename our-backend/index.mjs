import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import DB_Init from './entity/db_Init.mjs';
import createDbRouter from './routes/createDBRoute.mjs';
import StudentRouter from './routes/StudentRouter.mjs';
import courseRouter from './routes/CourseRouter.mjs';
import tagRouter from './routes/TagRouter.mjs';
import noteRouter from './routes/NoteRouter.mjs';
import studentRouter from './routes/StudentRouter.mjs';
import gradeRouter from './routes/GradeRouter.mjs';
env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use("/api", createDbRouter)
app.use("/api", studentRouter);
app.use("/api", courseRouter);
app.use("/api", tagRouter);
app.use("/api", noteRouter);
app.use("/api",gradeRouter);

let port = process.env.PORT || 8003;
app.listen(port);
console.log('API is runnning at ' + port);