const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = model('Note', NoteSchema);