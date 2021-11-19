const router = require('express').Router()
const postsChantier = require('../Controllers/postsChantier_controllers')

//Categorie
router.get('/healthy', (req, res) => {
    res.send('healthy categories')
})

//CRUD
router.get('/', postsChantier.getAllChantier);
router.get('/:id', postsChantier.getChantierById);
router.post('/', postsChantier.chantierNew);
router.put('/:id', postsChantier.chantierUpdate);
router.put('/vue/:id', postsChantier.chantierUpdateVue)
router.post('/add_commentaire/:id', postsChantier.addCommentaire)
router.post('/remove_commentaire/:id', postsChantier.removeCommentaire)
router.delete('/', postsChantier.chantierDelete);

module.exports = router;