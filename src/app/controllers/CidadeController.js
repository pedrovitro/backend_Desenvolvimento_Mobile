const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Cidade = require('../Model/Cidade');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const cidades = await Cidade.find().populate(['name', 'estabelecimento']);

        return res.send({ cidades });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading cidades' })
    }
});

router.get('/:cidadeId', async (req, res) => {
    try {
        const cidade = await Cidade.findById(req.params.cidadeId).populate(['name', 'estabelecimento']);

        return res.send({ cidade });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading cidade' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { name, estabelecimento } = req.body;

        const cidade = await Cidade.create({ name, estabelecimento});

        await cidade.save();

        return res.send({ cidade });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new cidade' })
    }
});

router.put('/:cidadeId', async (req, res) => {
    try {

        const { name, estabelecimento } = req.body;

        const cidade = await Cidade.findByIdAndUpdate(req.params.cidadeId, { name, estabelecimento }, { new: true });

        await cidade.save();

        return res.send({ cidade });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating cidade' })
    }
});

router.delete('/:cidadeId', async (req, res) => {
    try {
        await Cidade.findByIdAndRemove(req.params.cidadeId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting cidade' })
    }
});


module.exports = app => app.use('/cidade', router);