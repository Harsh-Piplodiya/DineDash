import dotenv from 'dotenv';
import connectDB from './db/dbConfig.js';
import { app } from './app.js';


dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error;
    })

    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection Failed!" + err);
})

// it's a http method using which we can request the data from the server
// app.get("/", (req, res) => {
//     res.send("API Working");
// })