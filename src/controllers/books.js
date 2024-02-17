// Aqui vem de services
const { Mongoose } = require("mongoose");
const fs = require("fs")
const books = require("../config/Books");



function welcome(req, res) {
    try {
        res.send("Bem vindos")

    } catch (error) {

        res.status(500).send(error.message)
    }

}

async function getBooks(req, res) {
    try {
        const listBooks = await books.find({})
        res.send(listBooks)

    } catch (error) {
        console.log("erro ao buscar livros", error)
        throw error
    }

}

function getBook(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const books = JSON.parse(fs.readFileSync("books.json"))

            // quando bota no [0] vai exibir a o objeto todo
            const bookFilter = books.filter(book => book.id === id)[0]

            res.send(bookFilter)
        } else {
            res.status(422).send("ID inválido")
        }

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

function postBook(req, res) {
    try {
        const newBook = req.body

        if (req.body.nome) {
            // "books" transforma o texto em objeto
            const books = JSON.parse(fs.readFileSync("books.json"))
            // Aqui a spread da lista "books" pega o parametro newBooks (que é uma lista) e adiciona. 
            const newBookslist = [...books, newBook]
            // transforma a nova lista em texto ou JSON
            fs.writeFileSync("books.json", JSON.stringify(newBookslist))

            res.status(201)
            res.send("Livro inserido com sucesso")
        } else {
            res.status(422).send("O campo é obrigatorio")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function patchBook(req, res) {
    try {
        const id = req.params.id
        const bodyModification = req.body
        // modification -> {nome: "livro muito legal"}

        if (id && Number(id)) {
            let booksAt = JSON.parse(fs.readFileSync("books.json"))
            const indexModificated = booksAt.findIndex(bookAt => bookAt.id === id)

            const contentModify = { ...booksAt[indexModificated], ...bodyModification }
            // booksAt[indexModificated] -> {id: "2", nome: "livro legal"} = objeto sem modificação
            // E ele ta colocando o objeto modification para dentro de booksAt[indexModificated] ou modifica ou adiciona um novo

            booksAt[indexModificated] = contentModify
            fs.writeFileSync("books.json", JSON.stringify(booksAt))

            res.send("Item modificado")
        } else {
            res.status(422).send("ID inválido")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

function deleteBook(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            let booksAt = JSON.parse(fs.readFileSync("books.json"))

            // Isso faz uma variavel com todos os livros menos com o id filtrado que passei
            const booksDeleted = booksAt.filter(bookAt => bookAt.id !== id)

            booksAt = booksDeleted
            fs.writeFileSync("books.json", JSON.stringify(booksAt))

            res.send("Item Deletado")
        } else {
            res.status(422).send("ID inválido")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Aqui manda pras rotas
module.exports = { welcome, getBooks, getBook, postBook, patchBook, deleteBook }