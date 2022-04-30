require('dotenv').config()
// async errors
require('express-async-errors')


const express = require("express")
const app = express();
const connectDB = require("./db/connect")
const notFoundMiddleWare = require("./middleware/not-found")
const errorMiddleWare = require("./middleware/error-handler")
const router = require("./routes/products")

app.use(express.json())

// routes

app.get('/', (req, res) => {
    res.send("Products Route")
})

app.use("/api/v1/products",router)
app.use(notFoundMiddleWare);
app.use(errorMiddleWare)



const port = process.env.PORT || 5000

const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
}
start();