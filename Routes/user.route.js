const router = require('express').Router()
const userControllers = require('../Controllers/user.controllers')

//test
router.get('/healthy', (req, res) => {
    res.send('healthy user')
})



//auth
router.post('/register', userControllers.signUp);
router.post('/login', userControllers.signIn);
router.get('/logout', userControllers.signOut);

//user crud
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUserById);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;