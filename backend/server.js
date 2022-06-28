const express = require("express")
const path=require('path')
const colors = require("colors")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 8000
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Routes
app.use("/api/users", require("./routes/userRoutes"))

app.use("/api/tickets", require("./routes/ticketRoutes"))

// Frontend Deploy
if(process.env.NODE_ENV==='production'){
  // set Build Folder as static
  app.use(express.static(path.join(__dirname,'../frontend/build')))
  app.get('*',(req,res)=>res.sendFile(__dirname,'../','frontend','build','index.html'))
}
else{
app.get("/", (req, res) => {
  res.status(200).json({ message: " Welcome to the ticket app" })
})

}



app.use(errorHandler)

app.listen(PORT, console.log(`server started on port ${PORT}`))
