const express = require("express");
const auth = require("../middlware/auth");
const taskcontroller = require("../controllers/taskcontroller");
const router = express.Router();
const upload = require("../middlware/multer");

router.post("/addtask", auth, upload, taskcontroller.addtask);
router.post("/addCollaborator/:id", auth, taskcontroller.addCollaborator);
router.get("/getTaskById/:taskId", auth, taskcontroller.getTaskById);
router.get("/getalltask", auth, taskcontroller.getalltask);
router.put("/updatetask/:id", auth, taskcontroller.updatetask);
router.delete("/deletetask/:id", auth, taskcontroller.deletetask);
router.get("/getFilteredTasks", auth, taskcontroller.getFilteredTasks);
router.get("/getTasksForUser", auth, taskcontroller.getTasksForUser);

module.exports = router;