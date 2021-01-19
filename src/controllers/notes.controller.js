const Note = require('../models/Note');

const notesCtrl = {

    renderNoteForm: (req, res) => {
        res.render('notes/new-note');
    },
    createNewNote: async(req, res) => {
        const { title, description } = req.body;
        const errors = [];
        if (!title) {
            errors.push({ text: 'Please write a title' });
        }

        if (!description) {
            errors.push({ text: 'Please write a description' });
        }

        if (errors.length > 0) {
            res.render('notes/new-note', { errors, title, description });
        } else {
            const newNote = new Note({ title, description });
            newNote.user = req.user.id;
            await newNote.save();
            req.flash('success_msg', 'Note Added Successfully');
            res.redirect('/notes');

        }
    },
    renderNote: async(req, res) => {

        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' });

        res.render('notes/all-notes', { notes });
    },
    renderEditForm: async(req, res) => {

        const note = await Note.findById(req.params.id);

        if (note.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            return res.redirect('/notes');
        }

        res.render('notes/edit-note', { note });
    },
    updateNote: async(req, res) => {

        const { title, description } = req.body;
        await Note.findByIdAndUpdate(req.params.id, { title, description });
        req.flash('success_msg', 'Note Updated Successfully');

        res.redirect('/notes');
    },
    deleteNote: async(req, res) => {

        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Note Deleted Successfully');

        res.redirect('/notes');
    }

}

module.exports = notesCtrl;