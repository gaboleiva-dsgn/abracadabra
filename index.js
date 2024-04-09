// importar express
const express = require('express');

// instanciar express
const app = express();
const PORT = process.env.PORT || 3000;
// levantar el servidor en puerto
app.listen(PORT, ()=> {
    console.log(`Servidor express escuchando por el puerto ${PORT}`)
});

// Middleward de uso general que indica que la carpeta assets es una carpeta pública
app.use(express.static("assets"));

// creamos variable con el arreglo con los nombres
const nombres = 
[
    "Gabo",
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
];

// creamos la primera ruta
app.get("/abracadabra/usuarios", (req, res)=>{
    res.json({ nombres });
});

// creación del Middleware la segunda ruta
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    // Validamos si el nombre de usuario esta en el arreglo nombres,
    // si no redirige a imagen who.jpeg.
    nombres.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg")
});

// Creación de la ruta juego
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
//si existe el nombre de usario enviamos el index.html con senfFile
    res.sendFile(__dirname + "/index.html")
});

// Creación de la ruta solicitada
app.get("/abracadabra/conejo/:n", (req, res) => {
    // creamos la variable numeroUser para almacenar el numero y lo tranformamos en Number
    const numUser = parseInt(req.params.n);
    const numero = Math.floor(Math.random() * (5 - 1)) + 1;
    // se cream console.log para validar por consola la elección de la maquina y el usuario
    console.log("Usuario escogió: ", numUser);
    console.log("Maquina escogió: ", numero);
    // Se valida si el nunUser y el numero son iguales nos muestra el conejito, 
    //de lo contrario muestra a Voldemort.
    numUser === numero ? res.redirect("/conejito.jpg") : res.redirect("/voldemort.jpg");
});

// Cramos la ruta genérica que devuelve un mensaje
app.get("*", (req, res) => {
    res.send("Esta página no existe...")
});