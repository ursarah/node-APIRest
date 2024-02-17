// livro.js
const { Router } = require("express")
const { welcome, getBooks, getBook, postBook, patchBook, deleteBook } = require("../controllers/books")
const router = Router()


// 2 - router é uma função que da uma rota
// isso aqui
router.get('/', welcome)

router.get('/books', getBooks)

router.get('/books/:id', getBook)

// é igual a esse
router.post('/books', postBook)

router.patch('/books/:id', patchBook)

router.delete('/books/:id', deleteBook)

// Aqui manda pra app
module.exports = router