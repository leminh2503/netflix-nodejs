const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const listRouter = require('./routes/list');
const cors = require('cors');

dotenv.config();

// const uri = "mongodb+srv://minhpm123:minhpm123@cluster0.vfgwl.mongodb.net/Cluster0?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log("thanh cong")
//     client.close();
// });

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex : true,
            // useFindAndModify : false,
        })
        console.log('mongooseDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

connectDB();
const app = express();

const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors())
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.listen(port, () => {
    console.log("backend  server is running! on", port);
})