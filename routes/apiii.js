const express = require("express");
const router = express.Router();
const { add_books, mostrar, add_libro_autor } = require('../db.js')

// Nuestras rutas
router.get("/libros", async(req, res) => {
    const user = await mostrar()
    console.log(user)
    res.json(user);

});

router.get("/autores", (req, res) => {
    res.json({ todo: "Ok" });
});

router.post("/libros", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_books(body.title, body.description);
        console.log(`body.description: ${body.description}`)
        res.json({ todo: "ok" });
    });
});

/* router.post('/api/escribir/:libro_id/:autor_id', async (req, res)=>{
    await add_libro_autor(req.params.libro_id, req.params.autor_id)
    res.redirect('/autores')
}) */


module.exports = router;