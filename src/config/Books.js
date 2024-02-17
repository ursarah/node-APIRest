const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://sarahurcezino:sarah123@cluster0.dqcjmb4.mongodb.net/bookstore?retryWrites=true&w=majority')

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number }
}, { versionKey: false });

// É um objeto que representa uma coleção
const books = mongoose.model("books", bookSchema)

module.exports = books


