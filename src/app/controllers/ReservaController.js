const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Reserva = require('../Model/Reserva');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const usuario = req.usuarioId
    try {
        const reservas = await Reserva.find({ usuario: usuario }).populate(['usuario', 'estabelecimento'])
        console.log(reservas)

        return res.send({ reservas });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading reserva' })
    }
});

router.get('/:reservaId', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.reservaId).populate(['usuario', 'estabelecimento']);

        return res.send({ reserva });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading reserva' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { estabelecimento, usuario, date } = req.body;

        const reserva = await Reserva.create({ estabelecimento, usuario, date});

        await reserva.save();

        return res.send({ reserva });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new reserva' })
    }
});

router.put('/:reservaId', async (req, res) => {
    try {

        const { estabelecimento, usuario, date } = req.body;

        const reserva = await Reserva.findByIdAndUpdate(req.params.reservaId, { estabelecimento, usuario, date}, { new: true });

        await reserva.save();

        return res.send({ reserva });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating reserva' })
    }
});

router.delete('/:reservaId', async (req, res) => {
    try {
        await Reserva.findByIdAndRemove(req.params.reservaId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting reserva' })
    }
});


module.exports = app => app.use('/reserva', router);