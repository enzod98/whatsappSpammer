const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('Authorization');

    //El verify recibe tres parámetros: el token recibido del head, la semilla y el callback
    jwt.verify(token, process.env.SEMILLA, (error, devolucion) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: 'Token no válido'
            })
        }

        req.usuario = devolucion.usuario;
        next();

    })
};


module.exports = verificarToken;