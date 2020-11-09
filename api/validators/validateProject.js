const Projects = require('../../data/helpers/projectModel.js');

const validateProject = (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.project = project;
                next();
            } else {
                res.status(404).json({message: "error: project not found"})
            }
        })
        .catch(e=>res.status(500).json({message: "error retrieving project information"}))
}
module.exports = validateProject;