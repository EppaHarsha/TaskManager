const express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskcontroller");
const middleware = require("../middleware")

router.post("/add",middleware,taskController.add);
router.get("/showTasks",middleware,taskController.showTasks);
router.get("/edit/:taskId",middleware,taskController.editTask);
router.get("/getTask/:taskId",middleware,taskController.getTask);
router.put("/update/:taskId", middleware, taskController.updateTask);
router.put("/completed/:taskId", middleware, taskController.completed);
router.delete("/delete/:taskId",middleware,taskController.delete);

module.exports=router;