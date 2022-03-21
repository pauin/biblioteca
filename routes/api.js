const express = require("express");
const app = express()
const router = express.Router();
const {newlibros, add_books, mostrar, add_autores, mostrar_autores} = require('../db.js')

//nuevas rutas

app.get("/", async (req,res)=>{
	const libros = await newlibros()
  res.render('index.html', {libros});
 });


// Nuestras rutas
router.post("/libros", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_books(body.title, body.descripcion);
    });
    res.json({ todo: "ok" });
});

router.get("/libros", async(req, res) => {
    const user = await mostrar()
    res.json(user);

});

router.post("/autores", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_autores(body.firstname, body.lastname, body.notes);
    });
    res.json({ todo: "ok" });
});

router.get("/autores", async(req, res) => {
    const user = await mostrar_autores()
    console.log(user)
    res.json(user);
});

app.use(express.json())


module.exports = router;