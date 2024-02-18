// Aqui vem de services

const fs = require("fs")
const books = require("../config/Books");

class booksController {
    static welcome(req, res) {
        try {
            res.send("Bem vindos")

        } catch (error) {

            res.status(500).send(error.message)
        }

    }

    static async getBooks(req, res) {
        try {
            const listBooks = await books.find({})

            res.status(201).json({
                message: "Livros",
                livro: listBooks
            })
        } catch (error) {
            console.log("erro ao buscar livros", error)
            throw error
        }

    }

    static async getBookForId(req, res) {
        try {
            const id = req.params.id

            if (id && Number(id)) {
                const bookForId = await books.findById(id)

                res.status(201).json({
                    message: "Livro encontrado",
                    livro: bookForId
                })
            } else {
                res.status(422).send("ID inválido")
            }

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    static async postBook(req, res) {
        try {

            if (req.body.nome) {
                const newBook = await books.create(req.body)

                res.status(201).json({
                    message: "Livro criado",
                    livro: newBook
                })
            } else {
                res.status(422).send("O campo é obrigatorio")
            }
        } catch (error) {
            res.status(500).json(`${error.message} - Falha ao cadastrar livro`)
        }
    }

    static async patchBook(req, res) {
        try {
            const id = req.params.id
            const bodyModification = req.body
            // modification -> {nome: "livro muito legal"}

            if (id && Number(id)) {
                await books.findByIdAndUpdate(id, bodyModification)

                res.status(200).json({ message: "Item modificado" })
            } else {
                res.status(422).send("ID inválido")
            }

        } catch (error) {
            res.status(500).json(`${error.message} - Falha ao atualizar livro`)
        }
    }

    static async deleteBook(req, res) {
        try {
            const id = req.params.id

            if (id && Number(id)) {
                await books.findByIdAndDelete(id)

                res.status(200).json({ message: "Item Deletado" })
            } else {
                res.status(422).send("ID inválido")
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
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
module.exports = { booksController }