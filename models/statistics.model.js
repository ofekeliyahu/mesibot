const { Schema, model } = require('mongoose');
const { schema } = require('./playlist.model');

const statisticsSchema = new Schema({
  groupId: { type: String, index: true, required: true },
  user: {
    userId: { type: String, index: true },
    userName: { type: String },
  },
  playlist: { type: Schema.Types.ObjectId, ref: 'playlist' },
  action: { type: String, required: true, enum: ['songAdded', 'downvote', 'upvote', 'songSkip', 'userSkip', 'playlistSaved', 'playlistImported', 'playlistCreated', 'songRemoved'] },
  song: {
    songId: { type: String },
    songTitle: { type: String },
  },
  timestemp: { type: Date, default: Date.now },
}, this.collection = 'statistics');
module.exports = model('statistics', statisticsSchema);
