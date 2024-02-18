// livro.js
const { Router } = require("express")
const { booksController, deleteBook } = require("../controllers/booksController")
const router = Router()


// 2 - router é uma função que da uma rota
// isso aqui
router.get('/', booksController.welcome)

router.get('/books', booksController.getBooks)

router.get('/books/:id', booksController.getBookForId)

// é igual a esse
router.post('/books', booksController.postBook)

router.patch('/books/:id', booksController.patchBook)

router.delete('/books/:id', booksController.deleteBook)

// Aqui manda pra app
module.exports = router