const notesDB = require('../database/helpers/noteDb');


module.exports = server => {
    server.get('/', greetings);
    server.get('/note/get/all', getAllNotes);
    server.post('/note/create', addNote);
    server.put('/note/edit/:id', updateNote);
    server.delete('/note/delete/:id', deleteNote);
}

const addNote = async (req, res) => {
    const note = req.body;

    if(note.title && note.description) {
        const posted = await notesDB.add(note);
        res.status(201).json(posted);
    } else {
        res.status(401).json({ message: 'The note is missing data' })
    }
};

const greetings = (req, res) => {
    res.send('Hello stranger. Welcome to my backend project week assignment :D');
}

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

    if(newNote.title && newNote.description) {
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