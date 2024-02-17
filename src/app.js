const express = require("express")
const routerBooks = require("./routes/books")
const app = express()


// Significa que agora a aplicação aceita json
app.use(express.json())

app.use("/", routerBooks)

module.exports = app