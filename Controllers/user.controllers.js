const userModel = require('../Models/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const maxAge = 3 * 24 * 60 * 60 * 1000
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { signUpErrors, signInErrors } = require('../utils/errors.utils')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.getAllUsers = async(req, res) => {
    const users = await userModel.find().select("-password");

    res.status(200).send(users)
}

module.exports.getUserById = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)
    const user = await userModel.findById(req.params.id, (err, data) => {
        if (!err)
            res.status(200).send(data);
        else
            res.status(400).send(err);
    }).select('-password');
}

module.exports.updateUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        await userModel.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    bio: req.body.bio
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err)
                    res.status(200).send(data)
                else
                    res.status(404).send(err)
            }
        )
    } catch (err) {
        res.status(400).send({ message: err })
    }
}

module.exports.deleteUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        await userModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        res.status(400).send({ message: err })
    }


}

module.exports.signUp = async(req, res) => {
    const { pseudo, email, password } = req.body

    try {
        const user = await userModel.create({ pseudo, email, password })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(400).send(errors)
    }
}
module.exports.signIn = async(req, res) => {
    const { email, password } = req.body

    try {

        const user = await userModel.login(email, password);

        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({
            user_id: user._id,
            token: token
        })


    } catch (err) {
        const errors = signInErrors(err);
        console.log(errors)
        res.status(401).send(errors)
    }
}

module.exports.signOut = (req, res) => {
    console.log('logout')
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/users')
}