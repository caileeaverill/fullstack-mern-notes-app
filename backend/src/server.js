import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001;

// middleware to parse JSON bodies

app.use(express.json())
app.use(rateLimiter)

// middleware to parse request bodies
// app.use((req, res, next) => {
//     console.log(`${req.method} request made to path ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`)
    })

})



