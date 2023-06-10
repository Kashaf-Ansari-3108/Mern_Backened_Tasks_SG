const express = require('express');
const router = express.Router();
const {createUser,login,getAllUser,getUser,updateUser} = require('../controllers/userControllers');
const jwt = require('../middlewares/jwtMiddleware')


router.post("/createUser",createUser);
router.post("/login",login);
router.get("/getAllUser",jwt.verifyToken,getAllUser);
router.get("/getUser/:id",jwt.verifyToken,getUser);
router.put("/updateUser/:id",jwt.verifyToken,updateUser);

module.exports = router;