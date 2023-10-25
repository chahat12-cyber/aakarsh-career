const express= require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
require('dotenv').config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(()=> console.log('Database connected'));

const UserRoutes = require('./routes/user_route');
const EntranceRoutes = require('./routes/entrance_route');
const BoardRoutes = require('./routes/board_route');
const ClassRoutes = require('./routes/class_route');
const StreamRoutes = require('./routes/stream_route');
const ExamRoutes = require('./routes/exam_route');
const ExamTypeRoutes = require('./routes/exam_type_route');
const SubjectRoutes = require('./routes/subject_route');

app.use("/api/user", UserRoutes);
app.use("/api/entrance", EntranceRoutes);
app.use("/api/board", BoardRoutes);
app.use("/api/class", ClassRoutes);
app.use("/api/stream", StreamRoutes);
app.use("/api/exam", ExamRoutes);
app.use("/api/exam-type", ExamTypeRoutes);
app.use("/api/subject", SubjectRoutes);

const PORT= process.env.PORT || 8000;


app.listen(PORT, ()=> console.log('Server started at Port : 8000'));

