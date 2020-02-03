const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
    idea: { type: String, required: true },
    description: { type: String, required: false },
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true, autopopulate: true }]
}, { timestamps: { createdAt: true, updatedAt: true } });

/**
 *  Plugin para autopopulate
 */
IdeaSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Idea', IdeaSchema);