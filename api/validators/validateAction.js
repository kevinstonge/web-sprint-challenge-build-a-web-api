const Actions = require('../../data/helpers/actionModel.js');

const validateAction = (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.action = action;
                next();
            } else {
                res.status(404).json({message: "error: action not found"})
            }
        })
        .catch(e=>res.status(500).json({message: "error retrieving action information"}))
}
module.exports = validateAction;