require("dotenv/config")
const app = require("./src/app")
const PORT = 8000


app.listen(PORT, () => {
    console.log(`Escutando a porta http://localhost:${PORT}`)
})


