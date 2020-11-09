const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js');
const validateProject = require('./validators/validateProject.js');

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(e => res.status(500).json({ message: "error" }));
});


router.use('/:id',validateProject)


router.get('/:id', (req, res) => {
    res.status(200).json(res.project)
})

router.get('/:id/actions', (req, res) => {
    res.status(200).json(res.project.actions)
})

router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name && !description) {
        res.status(400).json({ message: "error: please provide name and description for project" });
    } else {
        Projects.insert(req.body).then(r=>res.status(201).json(r)).catch(e=>res.status(500).json(e))
    }
});
 
router.put('/:id', (req, res) => {
    const { name, description, completed } = req.body;
    if (!name && !description && !completed) {
        res.status(400).json({message: "error: please include something to update"})
    } else {
        Projects.update(req.params.id, req.body).then(r=>res.status(200).json(r)).catch(e=>res.status(500).json(e))
    }
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id).then(r=res.status(200).json({message: 'project deleted'})).catch(e=>res.status(500).json(e))
})

module.exports = router;