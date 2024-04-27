const { Router } = require('express')

const { usuariosGet, 
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const router = Router()

router.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'get Api'
    })
})

router.put('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'put Api'
    })
})

router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'post Api'
    })
})

router.delete('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'delete Api'
    })
})

router.patch('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'patch Api'
    })
})


module.exports = router