const express = require('express');
const router = express.Router();
const {createUser,login} = require('../controllers/userControllers');


router.post("/createUser",createUser);
router.post("/login",login);



module.exports = router;