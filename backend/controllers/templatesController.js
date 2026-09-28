const db = require("../config/db");

const getTemplates = async (req, res) => {
    try {
        const [templates] = await db.promise().query(
            `SELECT
                wt.id,
                wt.trainer_id,
                wt.name,
                wt.description,
                wt.exercises,
                wt.is_public,
                wt.created_at,
                u.name as trainer_name
             FROM workout_templates wt
             JOIN users u ON wt.trainer_id = u.id
             WHERE wt.is_public = 1 OR wt.trainer_id = ?
             ORDER BY wt.created_at DESC`,
            [req.user ? req.user.id : 0]
        );

        res.status(200).json({
            templates
        });

    } catch (error) {
        console.error("Template fetch error:", error);
        res.status(500).json({
            message: "Unable to fetch templates"
        });
    }
};

const getTemplateById = async (req, res) => {
    try {
        const templateId = req.params.id;
        const userId = req.user ? req.user.id : 0;

        const [templates] = await db.promise().query(
            `SELECT
                wt.id,
                wt.trainer_id,
                wt.name,
                wt.description,
                wt.exercises,
                wt.is_public,
                wt.created_at,
                u.name as trainer_name
             FROM workout_templates wt
             JOIN users u ON wt.trainer_id = u.id
             WHERE wt.id = ? AND (wt.is_public = 1 OR wt.trainer_id = ?)`,
            [templateId, userId]
        );

        if (templates.length === 0) {
            return res.status(404).json({
                message: "Template not found or access denied"
            });
        }

        res.status(200).json({
            template: templates[0]
        });

    } catch (error) {
        console.error("Template fetch error:", error);
        res.status(500).json({
            message: "Unable to fetch template"
        });
    }
};

const createTemplate = async (req, res) => {
    try {
        const { name, description, exercises, is_public = false } = req.body;
        const trainerId = req.user ? req.user.id : null;

        if (!trainerId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!name) {
            return res.status(400).json({
                message: "Template name is required"
            });
        }

        const [result] = await db.promise().query(
            `INSERT INTO workout_templates (trainer_id, name, description, exercises, is_public)
             VALUES (?, ?, ?, ?, ?)`,
            [trainerId, name, description, JSON.stringify(exercises || []), is_public ? 1 : 0]
        );

        res.status(201).json({
            message: "Template created successfully",
            templateId: result.insertId
        });

    } catch (error) {
        console.error("Template creation error:", error);
        res.status(500).json({
            message: "Unable to create template"
        });
    }
};

const updateTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const userId = req.user ? req.user.id : 0;
        const { name, description, exercises, is_public } = req.body;

        // Check if template exists and user owns it
        const [existing] = await db.promise().query(
            `SELECT id FROM workout_templates WHERE id = ? AND trainer_id = ?`,
            [templateId, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: "Template not found or access denied"
            });
        }

        const [result] = await db.promise().query(
            `UPDATE workout_templates
             SET name = ?, description = ?, exercises = ?, is_public = ?
             WHERE id = ? AND trainer_id = ?`,
            [
                name || undefined,
                description !== undefined ? description : undefined,
                exercises !== undefined ? JSON.stringify(exercises) : undefined,
                is_public !== undefined ? (is_public ? 1 : 0) : undefined,
                templateId,
                userId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No changes made"
            });
        }

        res.status(200).json({
            message: "Template updated successfully"
        });

    } catch (error) {
        console.error("Template update error:", error);
        res.status(500).json({
            message: "Unable to update template"
        });
    }
};

const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const userId = req.user ? req.user.id : 0;

        const [result] = await db.promise().query(
            `DELETE FROM workout_templates WHERE id = ? AND trainer_id = ?`,
            [templateId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Template not found or access denied"
            });
        }

        res.status(200).json({
            message: "Template deleted successfully"
        });

    } catch (error) {
        console.error("Template delete error:", error);
        res.status(500).json({
            message: "Unable to delete template"
        });
    }
};

module.exports = {
    getTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
};