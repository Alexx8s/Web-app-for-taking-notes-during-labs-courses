import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import DB_Init from './entity/DBinit.js';
import createDbRouter from './route/createDbRoute.js';
import userRouter from './route/UserRouter.js';
import subjectRouter from './route/SubjectRouter.js';
import tagRouter from './route/TagRouter.js';
import noteRouter from './route/NoteRouter.js';
env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use("/api", createDbRouter)
app.use("/api", userRouter);
app.use("/api", subjectRouter);
app.use("/api", tagRouter);
app.use("/api", noteRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);