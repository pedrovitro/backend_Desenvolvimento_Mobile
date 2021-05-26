const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Item = require('../Model/Item');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const itens = await Item.find();

        return res.send({ itens });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading itens' })
    }
});

router.get('/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);

        return res.send({ item });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading item' })
    }
});

router.post('/', async (req, res) => {
    try {

        const { login, senha, reserva  } = req.body;

        const item = await Item.create({ login, senha, reserva});

        await item.save();

        return res.send({ item });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new item' })
    }
});

router.put('/:itemId', async (req, res) => {
    try {

        const { login, senha, reserva } = req.body;

        const item = await Item.findByIdAndUpdate(req.params.itemId, { login, senha, reserva }, { new: true });

        await item.save();

        return res.send({ item });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating item' })
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        await Item.findByIdAndRemove(req.params.itemId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting item' })
    }
});


module.exports = app => app.use('/itens', router);