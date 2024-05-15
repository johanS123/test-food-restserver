const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.path = {
            usersPath: '/api/users',
            authPath: '/api/auth',
            productPath: '/api/products',
            stocktakingPath: '/api/stocktaking',
            orderPath: '/api/orders'
        }

        // Conetar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio Público
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.path.authPath, require('../routes/auth'))
        this.app.use(this.path.productPath, require('../routes/products'))
        this.app.use(this.path.usersPath, require('../routes/users'))
        this.app.use(this.path.stocktakingPath, require('../routes/stocktaking'))
        this.app.use(this.path.orderPath, require('../routes/orders'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}



module.exports = Server