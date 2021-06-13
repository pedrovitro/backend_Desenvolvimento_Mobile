const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Categoria = require('../Model/Categoria');

const router = express.Router();

// router.use(authMiddleware);

router.get('/', async (req, res) => {
    console.log("oi")
    try {
        const categorias = await Categoria.find().populate(['estabelecimento']);

        return res.send({ categorias });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading categorias' })
    }
});

router.get('/:categoriaId', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.categoriaId).populate(['estabelecimento']);

        return res.send({ categoria });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading categoria' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { name, estabelecimento } = req.body;

        const categoria = await Categoria.create({ name, estabelecimento});

        await categoria.save();

        return res.send({ categoria });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new categoria' })
    }
});

router.put('/:categoriaId', async (req, res) => {
    try {

        const { name, estabelecimento } = req.body;

        const categoria = await Categoria.findByIdAndUpdate(req.params.categoriaId, { name, estabelecimento }, { new: true });

        await categoria.save();

        return res.send({ categoria });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating categoria' })
    }
});

router.delete('/:categoriaId', async (req, res) => {
    try {
        await Categoria.findByIdAndRemove(req.params.categoriaId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting categoria' })
    }
});


module.exports = app => app.use('/categoria', router);