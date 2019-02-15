
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');

const userDB = require('../database/helpers/userDb');
const notesDB = require('../database/helpers/noteDb');


//server.use(authenticate);
module.exports = server => {
    server.post('/note/register', register);
    server.post('/note/login', login);

    

    server.get('/note/get/all', getAllNotes);
    server.post('/note/create', addNote);
    server.put('/note/edit/:id', updateNote);
    server.delete('/note/delete/:id', deleteNote);
}

const register = async (req, res) => {
    const user = req.body;

    if(user.name && user.email && user.password) {
        user.password = bcrypt.hashSync(user.password, 12);
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
                res.status(401).json({ message: 'login information is incorrect' });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to verify. Please try again' });
        });
};

const addNote = async (req, res) => {
    const note = req.body;

    if(note.title && note.description && note.user_id) {
        const posted = await notesDB.add(note);
        res.status(201).json(posted);
    } else {
        res.status(401).json({ message: 'The note is missing data' })
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesDB.get();
        res.send(notes);
    } catch(e) {
        res.status.send(e);
    }
};

const updateNote = async(req, res) => {
    const { id } = req.params;
    const newNote = req.body;
    newNote.id = id;

    if(newNote.title && newNote.description && newNote.user_id) {
        const updated = await notesDB.update(newNote.id, newNote);
        res.json(updated);
    } else {
        res.status(401).json({ message: 'The note is missing data' });
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    if(id === 'undefined' || id === 0 || id === 'null') {
        res.status(401).json({ message: 'You need a valid id for the note you want to delete '});
    } else {
        const deleted = await notesDB.remove(id);
        res.status(200).json(deleted);
    }
};