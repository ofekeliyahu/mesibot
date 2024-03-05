const mongoose = require('mongoose');
const Path = require('path');
const { config } = require('dotenv');
const Playlist = require('../Playlist');


class playlistHandler {
  constructor(entity) {
    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
    this.Model = require(Path.join(__dirname, `../models/${this.entityName}.model.js`));
  }

  getPlaylists = () => this.Model.findPlaylist();

  getPlaylistById = (playlistId) => this.Model.find({ _id: playlistId });

  createPlaylist = (Playlist) => this.Model.create(Playlist);

  getGroupPlaylists = (groupId) => this.Model.find({ groupId });

  updatePlaylist = (playlistId, Playlist) => this.Model.updateOne({ playlistId }, Playlist);

  deletePlaylist = (playlistId) => this.Model.deleteOne({ playlistId: Playlist });

  existPlaylist = (playlistID) => this.Model.exists({ playlistID: Playlist });
}

module.exports = { playlistHandler };
