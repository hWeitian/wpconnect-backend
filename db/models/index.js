// Function way for db/models/index.js
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.js")[env];

const initRoom = require("./rooms.js");
const initSpeaker = require("./speakers.js");
const initConference = require("./conferences.js");
const initSession = require("./sessions.js");
const initConferenceSpeaker = require("./conference_speakers.js");
const initTopic = require("./topics.js");
const initTopicSpeaker = require("./topic_speakers.js");
const initSessionSpeaker = require("./session_speakers.js");

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.Room = initRoom(sequelize);
db.Speaker = initSpeaker(sequelize);
db.Conference = initConference(sequelize);
db.Session = initSession(sequelize);
db.ConferenceSpeaker = initConferenceSpeaker(sequelize);
db.Topic = initTopic(sequelize);
db.TopicSpeaker = initTopicSpeaker(sequelize);
db.SessionSpeaker = initSessionSpeaker(sequelize);

// One to many relationship between rooms and sessions
// One room has many sessions
db.Room.hasMany(db.Session);
db.Session.belongsTo(db.Room);

// Many to many relationship between speakers and conferences
// One speaker has many conferences and one conference has many speakers
db.Speaker.belongsToMany(db.Conference, {
  through: db.ConferenceSpeaker,
  onDelete: "CASCADE",
});
db.Conference.belongsToMany(db.Speaker, {
  through: db.ConferenceSpeaker,
  onDelete: "CASCADE",
});

// Many to many relationship between speakers and sessions
// One speaker has many sessions and one session has many speakers
db.Speaker.belongsToMany(db.Session, {
  through: db.SessionSpeaker,
  onDelete: "CASCADE",
});
db.Session.belongsToMany(db.Speaker, {
  through: db.SessionSpeaker,
  onDelete: "CASCADE",
});

// Many to many relationship between speakers and topics
// One speaker has many topics and one topic has many speakers
db.Speaker.belongsToMany(db.Topic, {
  through: db.TopicSpeaker,
  onDelete: "CASCADE",
});
db.Topic.belongsToMany(db.Speaker, {
  through: db.TopicSpeaker,
  onDelete: "CASCADE",
});

// One to many relationship between conferences and sessions
// One conference has many sessions
db.Conference.hasMany(db.Session);
db.Session.belongsTo(db.Conference);

// One to many relationship between conferences and rooms
// One conference has many rooms
db.Conference.hasMany(db.Room);
db.Room.belongsTo(db.Conference);

// One to many relationship between conferences and topics
// One conference has many topics
db.Conference.hasMany(db.Topic);
db.Topic.belongsTo(db.Conference);

// One to many relationship between sessions and topics
// One session has many topics
db.Session.hasMany(db.Topic);
db.Topic.belongsTo(db.Session);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
