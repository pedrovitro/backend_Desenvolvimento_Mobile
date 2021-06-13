const express = require('express');
const Usuario = require('../Model/Usuario');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {

        if (await Usuario.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;

        const data ={
            usuario: usuario,
            token : generateToken({ id: usuario.id })
        }
        console.log(data)
        return res.send({
           data
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, resp) => {
    const { email, senha } = req.body;
    console.log("passou auth :" + email + " " + senha);

    const usuario = await Usuario.findOne({ email }).select('+senha');
    console.log("user: " + usuario + " " + usuario.senha)

    if (!usuario) {
        return resp.status(400).send({ error: 'User not found' });
    }

    if (senha != usuario.senha)
        return resp.status(401).send({ error: 'invalid senha' });

        usuario.senha = undefined;

    resp.send({
        usuario,
        token: generateToken({ id: usuario.id }),
    });

});

router.post('/forgot_password', async (req, res) => {

    const { email } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario)
            return res.status(400).send({ error: 'User not find' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Usuario.findByIdAndUpdate(usuario.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'listalugares@gmail.com',
            template: 'auth/forgot_password',
            context: { token }
        }, (err) => {
            if (err) {
                return res.status(400).send({ error: 'Cannot send forgot password email' })
            }

            return res.send();
        })

    } catch (err) {
        res.status(400).send({ err: 'Erro on forgot password, try again' });
    }
})

router.post('/reset_password', async (req, res) => {
    const { email, token, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email }).select('+passwordResetToken passwordResetExpires');

        if (!usuario)
            return res.status(400).send({ error: 'User not find' });

        if (token !== usuario.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if (now > usuario.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' })

            usuario.senha = senha;

        await usuario.save();

        res.send();
    } catch (err) {
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }
});

module.exports = app => app.use('/auth', router);