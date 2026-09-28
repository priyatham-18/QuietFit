const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
} = require("../controllers/templatesController");

const router = express.Router();

// Protect all template routes
router.use(protect);

router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.post("/", createTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;