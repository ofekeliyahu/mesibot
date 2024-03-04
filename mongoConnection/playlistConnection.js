const mongoose = require('mongoose');
const Path = require('path');
const { config } = require('dotenv');
const Playlist = require('../Playlist');

class playlistStorage {
  constructor(entity) {
    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
    this.Model = require(Path.join(__dirname, `./models/${this.entityName}.model.js`));
    this.connect();
  }

  connect() {
    const connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
    mongoose
      .connect(connectionUri)
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((error) => {
        console.error('Error connecting to the database', error);
      });
  }

  getPlaylists = () => this.Model.findPlaylist();

  getPlaylistId = (playlistId) => this.Model.find({ id: playlistId });

  createPlaylist = (Playlist) => this.Model.create(Playlist);

  updatePlaylist = (playlistId, Playlist) => this.Model.updateOne({ playlistId }, Playlist);

  deletePlaylist = (playlistId) => this.Model.deleteOne({ playlistId: Playlist });

  existPlaylist = (playlistID) => this.Model.exists({ playlistID: Playlist });
}

module.exports = { playlistStorage };
