const User = require ('../models/User');

const user_edit = (req, res) => {

}

const user_delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete (id)
        .then(result => {
            res.json ({redirect: '/'})
        })
        .catch ((err) => {
            console.log (err);
        })
}

module.exports = {
    user_edit,
    user_delete
}