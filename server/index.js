import express from 'express'
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');
const path = require('path');
const authRouter = require("../src/routes/auth");
const userRouter = require('../src/routes/users');
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require("../src/db/connectDb");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRouter);
app.use('/api', userRouter)
app.use(express.static(path.join(__dirname + '/public')))
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();