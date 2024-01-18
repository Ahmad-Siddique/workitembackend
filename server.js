const express = require("express");
// const notes = require("./data/notes");
const mongoose = require("mongoose");
const Controllers = require("./Controllers/UserController");
const userRouter = require("./Routes/userRoute");
const materialRouter = require("./Routes/materialRoute");
const labourRouter = require("./Routes/labourRoute");
const equipmentRouter = require("./Routes/equipmentRoute");
const workitemRouter = require("./Routes/workitemRoute");

const path = require("path");
const serverstate = "Production";
const dotenv = require("dotenv")

dotenv.config()
// const __dirname = dirname(__filename);
// console.log(__dirname);

// const { notFound, errorHandler } = require("./middlewares/errorHandlers");
var port = process.env.PORT || 8000;
const app = express();
// const cors = require("cors");

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "https://coming-to-me-from-backend.onrender.com");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

var cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "0.0.0.0",
      "http://localhost:6000",
      "https://mern-task-app-qfj3.onrender.com",
      "https://mern-stack-app-come-to-me.onrender.com",
      "https://exhibitors.prointegrationfuture.asia",
      "https://office-frontend-work-item.onrender.com",
    ],
  })
);
// app.use(cors({ origin: "http://localhost:3000" }));
// use it before all route definitions
// app.use(function (request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);

const mongo_connection = mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then((conn) => {
    console.log("Connected to the database", conn.connection.host);
  })
  .catch((err) => {
    console.log("error occured", err);
  });



// // MongoDB connection setup
// mongoose.connect('mongodb://0.0.0.0:27017/judgments', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// // app.post('/user',Controllers.userController)

// app.get("/api/notes/:id", (req, res) => {
//   const id = req.params.id;
//   const note = notes.find((n) => n._id === id);

//   res.send(note);
// });

var cron = require("node-cron");

// cron.schedule(
//   "0 */1 * * *",
//   () => {
//     const now = new Date();
//     const current = now.getHours();
//     console.log(current);
//     console.log("GGWP");
//     try {
//       TaskControllers.TaskRecurringTask(current);
//       console.log("Running a job at 1 min at Asia/Kolkata timezone");
//     } catch (e) {
//       console.log(e);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata",
//   }
// );

// app.get("/", (req, res) => {

//   res.send('note');
// });

app.use(userRouter);
app.use("/api/material", materialRouter);
app.use("/api/labour", labourRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/workitem", workitemRouter);

// app.use(taskRouter);

// ---------- Deployment ------------
// __dirname = path.resolve();

// const gg = path.join(__dirname, "../");
// console.log(gg);
// console.log(path.join(gg, "app/frontend", "build", "index.html"));
// console.log(path.join(gg, "app/frontend/build"));

// if (serverstate === "Chilling") {
//   app.use(express.static(path.join(gg, "template_react", "build")));
//   // app.use(express.static(path.join(gg, "frontend/build")));

//   app.get("/*", (req, res) => {
//     // console.log(
//     //   res.sendFile(path.join(gg, "app/frontend", "build", "index.html"))
//     // );

//     return res.sendFile(path.join(gg, "template_react", "build", "index.html"));
//     //  return res.sendFile(
//     //    path.resolve(gg, "frontend", "build", "index.html")
//     //  );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log("Server Listening at port ",port);
});
