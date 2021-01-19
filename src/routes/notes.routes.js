const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../helpers/auth');

const {
    renderNoteForm,
    createNewNote,
    renderNote,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', createNewNote);
router.get('/notes', isAuthenticated, renderNote);
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit-note/:id', isAuthenticated, updateNote);
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;