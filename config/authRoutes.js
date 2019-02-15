const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');

const userDB = require('../database/helpers/userDb');

module.exports = server => {
    server.post('/note/register', register);
    server.post('/note/login', login);

    server.use(authenticate);
}

const register = async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);

    if(user.name && user.email && user.password) {
        const registered = await userDB.add(user);
        res.status(201).json(registered);
    } else {
        res.status(401).json({ message: 'The user is missing data' });
    }
};

const login = (req, res) => {
    const user = req.body;

    userDB.get(user)
        .then(users => {
            if(users.length && bcrypt.compareSync(user.password, users[0].password)) {
                const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
                });
                
                res.json({ message: 'Logged in', jwt: token });
            } else {
                res.status(404).json({ message: 'login information is incorrect' });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to verify. Please try again' });
        });
};