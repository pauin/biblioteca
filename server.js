const express = require ('express')
const path = require("path")
const nunjucks = require ('nunjucks') 
const bodyParser= require('body-parser')
const {newautores, newlibros, add_books, mostrar, add_autores, mostrar_autores} = require('./db.js')
const app = express()

//middlewares
app.use(express.static('_static'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))
app.use(bodyParser.urlencoded({extended:true}));

nunjucks.configure(path.resolve('./templates'),{
     express: app,
     autoscape: true,
     noCache: false,
     watch: true,
})
app.use(express.json())

/* const rutas_api = require("./routes/api.js");
app.use("/api", rutas_api); */


//nuevas rutas
app.get("/", async (req,res)=>{
	const libros = await newlibros()
  res.render('index.html', {libros});
 });

 app.get("/autores", async (req,res)=>{
	const autores = await newautores()
  	res.render('autores.html', {autores});
 });

 app.get('/api/autores', async (req, res) => {
	const autores = await newautores()
	res.status(200).json(autores)
})

app.get('/api/libros', async (req, res) => {
	const libros = await newlibros()
	res.status(200).json(libros)
})










 //rutas antiguas
app.post("/libros", async(req, res) => {
     let body = "";
     req.on("data", (data) => (body += data));
     req.on("end", async() => {
         body = JSON.parse(body);
         await add_books(body.title, body.descripcion);
     });
     res.json({ todo: "ok" });
 });
 
 app.get("/libros", async(req, res) => {
     const user = await mostrar()
     res.json(user);
 
 });
 
 app.post("/autores", async(req, res) => {
     let body = "";
     req.on("data", (data) => (body += data));
     req.on("end", async() => {
         body = JSON.parse(body);
         await add_autores(body.firstname, body.lastname, body.notes);
     });
     res.json({ todo: "ok" });
 });
 
 app.get("/autores", async(req, res) => {
     const user = await mostrar_autores()
     console.log(user)
     res.json(user);
 });
 
 app.use(express.json())



app.listen(3000, ()=> console.log('conectados en el puerto 3000'))