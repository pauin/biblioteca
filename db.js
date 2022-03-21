const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "biblioteca",
    password: "1234",
    port: "5432",
    max: 12,
    min: 2,
    idleTimeoutMillis: 3000,
    connectTimeoutMillis: 2000,
});

async function add_books(title, descripcion) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into libros (title, descripcion) values ($1, $2)`,
        values: [title, descripcion],
    });
    client.release();
    return rows[0];
}

async function mostrar() {
    const client = await pool.connect();
    const { rows } = await client.query(`select * from libros`);
    client.release();
    return rows;
}

async function add_autores(firstname, lastname, notes) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into autores (firstname, lastname, notes) values ($1, $2, $3)`,
        values: [firstname, lastname, notes],
    });
    client.release();
    return rows[0];
}
async function mostrar_autores() {
    const client = await pool.connect();
    const { rows } = await client.query(`select * from autores`);
    client.release();
    return rows;
}

//nuevas funciones
async function newlibros() {
    const client = await pool.connect()
    const { rows } = await client.query('select * from libros')
    client.release()
    return rows
  }

async function newautores() {
    const client = await pool.connect()
    const { rows } = await client.query('select * from autores')
    client.release()
    return rows
}


module.exports = { newautores, newlibros, add_books, mostrar, add_autores, mostrar_autores }