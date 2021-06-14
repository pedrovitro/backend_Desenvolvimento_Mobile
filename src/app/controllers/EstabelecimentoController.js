const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Estabelecimento = require('../Model/Estabelecimento');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const estabelecimentos = await Estabelecimento.find().populate([' reserva' ,' categoria' ,' cidade']);

        return res.send({ estabelecimentos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading estabelecimentos' })
    }
});

router.get('/:cidade', async (req, res) => {
    const {cidade} = req.params
    try {
        const estabelecimentos = await Estabelecimento.find({ cidade: cidade}).populate([' reserva' ,' categoria' ,' cidade']);

        return res.send({ estabelecimentos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading estabelecimentos' })
    }
});

router.get('/:estabelecimentoId', async (req, res) => {
    try {
        const estabelecimento = await Estabelecimento.findById(req.params.estabelecimentoId).populate([' reserva' ,' categoria' ,' cidade']);

        return res.send({ estabelecimento });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading estabelecimento' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { nome, descricao, avaliacao, telefone, endereco, reserva, categoria,cidade  } = req.body;

        const estabelecimento = await Estabelecimento.create({ nome, descricao, avaliacao, telefone, endereco, reserva, categoria, cidade});

        await estabelecimento.save();

        return res.send({ estabelecimento });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new estabelecimento' })
    }
});

router.put('/:estabelecimentoId', async (req, res) => {
    try {

        const { nome, descricao, avaliacao, telefone, endereco, reserva, categoria, cidade } = req.body;

        const estabelecimento = await Estabelecimento.findByIdAndUpdate(req.params.estabelecimentoId, { nome, descricao, avaliacao, telefone, endereco,  reserva, categoria, cidade }, { new: true });

        await estabelecimento.save();

        return res.send({ estabelecimento });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating estabelecimento' })
    }
});

router.delete('/:estabelecimentoId', async (req, res) => {
    try {
        await Estabelecimento.findByIdAndRemove(req.params.estabelecimentoId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting estabelecimento' })
    }
});


module.exports = app => app.use('/estabelecimento', router);