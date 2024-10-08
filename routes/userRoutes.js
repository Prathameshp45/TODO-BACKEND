const express = require("express");

const usercontroller = require("../controllers/usercontroller");
const auth = require("../middlware/auth");
const upload = require("../middlware/multer");

const router = express.Router();

router.post("/register", upload, usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/userinfo", auth, usercontroller.userinfo);
router.get("/getAllUsers", auth, usercontroller.getAllUsers);

module.exports = router;