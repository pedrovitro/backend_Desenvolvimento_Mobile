const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Usuario = require('../Model/Usuario');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find({ usuario: usuario }).populate(['reserva']);

        return res.send({ usuarios });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading usuarios' })
    }
});

router.get('/:usuarioId', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId).populate(['reserva']);

        return res.send({ usuario });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading usuario' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { email, senha, reserva  } = req.body;

        const usuario = await Usuario.create({ email, senha, reserva});

        await usuario.save();

        return res.send({ usuario });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new usuario' })
    }
});

router.put('/:usuarioId', async (req, res) => {
    try {

        const { email, senha, reserva } = req.body;

        const usuario = await Usuario.findByIdAndUpdate(req.params.usuarioId, { email, senha, reserva }, { new: true });

        await usuario.save();

        return res.send({ usuario });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating usuario' })
    }
});

router.delete('/:usuarioId', async (req, res) => {
    try {
        await Usuario.findByIdAndRemove(req.params.usuarioId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting usuario' })
    }
});


module.exports = app => app.use('/usuario', router);