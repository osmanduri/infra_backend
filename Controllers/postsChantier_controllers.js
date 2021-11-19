const chantierModel = require('../Models/postsChantier')
const ObjectID = require('mongoose').Types.ObjectId
const moment = require('moment')
moment.locale('fr')
module.exports.getAllChantier = async(req, res) => {
    const chantier = await chantierModel.find();
    res.status(200).send(chantier)
}

module.exports.getChantierById = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    await chantierModel.findById(req.params.id, (err, data) => {
        if (!err)
            return res.status(200).send(data)
        else
            res.status(401).send('error')
    })
}

module.exports.chantierNew = (req, res) => {
    const categorie = new chantierModel({
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        format: req.body.format,
        h2: req.body.h2,
        p: req.body.p,
        vue: req.body.vue,
        commentaire: req.body.commentaire,
        like: req.body.like,
        date: moment().format('l')
    })

    categorie.save()

    res.send(categorie)
}

module.exports.chantierUpdate = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    const updateCategorie = {
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        format: req.body.format,
        h2: req.body.h2,
        p: req.body.p,
        vue: req.body.vue,
        single_commentaire: req.body.single_commentaire,
        commentaire: req.body.commentaire,
        like: req.body.like,
        date: moment().format('l')
    }
    try {
        await chantierModel.findByIdAndUpdate(
            req.params.id, {
                $set: updateCategorie

            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err)
                    return res.status(200).send(data)
                if (err)
                    return res.status(401).send(err)

            }

        )

    } catch (err) {
        res.send(err)
    }
}

module.exports.chantierDelete = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    try {
        chantierModel.findByIdAndRemove(
            req.params.id,
            (err, data) => {
                if (!err)
                    res.status(200).send(data)
                if (err)
                    res.status(401).send(err)
            }
        )
    } catch (err) {
        res.send(err)
    }

}

module.exports.chantierUpdateVue = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    let vue = await chantierModel.findByIdAndUpdate(req.params.id)

    let updateCategorie = {
        vue: ++vue.vue,
    }
    try {
        await chantierModel.findByIdAndUpdate(
            req.params.id, {
                $set: updateCategorie

            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err)
                    return res.status(200).send(data)
                if (err)
                    return res.status(401).send(err)

            }

        )

    } catch (err) {
        res.send(err)
    }
}

module.exports.addCommentaire = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    let chantier = await chantierModel.findByIdAndUpdate(req.params.id)

    chantier.commentaire.push(req.body.single_commentaire)

    console.log(chantier.commentaire)
    let updateChantier = {
        commentaire: chantier.commentaire,
    }
    try {
        await chantierModel.findByIdAndUpdate(
            req.params.id, {
                $set: updateChantier

            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err)
                    return res.status(200).send(data)
                if (err)
                    return res.status(401).send(err)
            }
        )

    } catch (err) {
        res.send(err)
    }
}

module.exports.removeCommentaire = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id unknown: ' + req.params.id)

    let chantier = await chantierModel.findByIdAndUpdate(req.params.id)

    chantier.commentaire.pop()

    console.log(chantier.commentaire)

    let updateCategorie = {
        commentaire: chantier.commentaire,
    }
    try {
        await chantierModel.findByIdAndUpdate(
            req.params.id, {
                $set: updateCategorie

            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if (!err)
                    return res.status(200).send(data)
                if (err)
                    return res.status(401).send(err)

            }

        )

    } catch (err) {
        res.send(err)
    }
}