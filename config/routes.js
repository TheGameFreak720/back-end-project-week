
const notesDB = require('../database/helpers/noteDb');
const passport = require('passport');

module.exports = server => {
    server.get('/note/get/all', getAllNotes);
    server.post('/note/create', addNote);
    server.put('/note/edit/:id', updateNote);
    server.delete('/note/delete/:id', deleteNote);

    server.get('/login', passport.authenticate('auth0', {
        scope: 'openid email profile'
      }),
      login
    );
    server.get('/callback', callback);
    server.get('/logout', logout);
}


//Note functions

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
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    const deleted = await notesDB.remove(id);
    res.status(200).json(deleted);
};

//Auth functions

const login = (req, res) => {
    res.redirect('/')
}

const callback = (req, res, next) => {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}