const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    user: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
}, {timestamps: true});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);