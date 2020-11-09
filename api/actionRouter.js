const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel.js');
const validateAction = require('./validators/validateAction.js');

router.get('/', (req, res) => { res.status(200).json({ message: "actions router online!" }) })

router.use('/:id', validateAction);

router.get('/:id', (req, res) => {
    Actions.get(req.params.id).then(r => res.status(200).json(r));
});

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    console.log(req.body);
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "error: please include project_id, description, and notes" });
    } else {
        Actions.insert(req.body).then(r=>res.status(201).json(r)).catch(e=>res.status(500).json(e))
    }
});

router.put('/:id', (req, res) => {
    const {  project_id, description, notes, completed } = req.body;
    if (!project_id && !description && !notes && !completed) { 
        res.status(400).json({message: "error: please include something to update"})
    } else {
        Actions.update(req.params.id, req.body).then(r=>res.status(200).json(r)).catch(e=>res.status(500).json(e))
    }
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id).then(r=>res.status(200).json({message: `action deleted`})).catch(e=>res.status(500).json(e))
})

module.exports = router;