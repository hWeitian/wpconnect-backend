const db = require("../db/models");
const { Conference, Room } = db;
const { Op } = require("sequelize");
const { createPage } = require("../utils/wordpress");

const getConferences = async (req, res) => {
  try {
    const conferences = await Conference.findAll({
      order: [["startDate", "DESC"]],
    });
    return res.status(200).json(conferences);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addConference = async (req, res) => {
  const { startDate, endDate, name, country, venue, url, roomItems } = req.body;
  try {
    // Create a Program Overview page on WordPress website
    const { wordpressLink, wordpressId } = await createPage(
      "<p>Stay tuned for more updates</p>",
      "Program Overview",
      url,
      "publish"
    );

    // After the program overview page is created, store the information in the database
    const conference = await Conference.create({
      startDate,
      endDate,
      name,
      country,
      venue,
      wordpressUrl: url,
      programId: wordpressId,
      programUrl: wordpressLink,
    });

    // Get the newly created conference id and use it to update the rooms in database
    const conferenceId = conference.dataValues.id;
    roomItems.forEach((room) => {
      room.conferenceId = conferenceId;
    });
    const rooms = await Room.bulkCreate(roomItems);

    return res.status(200).json(conference);
  } catch (err) {
    console.log(err, "error");
    return res.status(500).json(err);
  }
};

/**
 * Function to get the wordpress url of a specific conference
 * @param {number} conferenceId
 * @returns {string} Wordpress url. Example: https://hweitian.com
 */
const getConferenceUrl = async (conferenceId) => {
  try {
    const url = await Conference.findByPk(conferenceId, {
      attributes: ["wordpressUrl"],
    });
    const urlJson = url.toJSON();
    const wordPressUrl = urlJson.wordpressUrl;
    return wordPressUrl;
  } catch (e) {
    console.log("error", e);
  }
};

/**
 * Function to get the latest conference that is added to the database.
 * @returns {Array} An array of object.
 * Contains information of the latest conference added to database.
 */
const getLatestConference = async () => {
  try {
    const latestConferenceData = await Conference.findAll({
      limit: 1,
      order: [["startDate", "DESC"]],
    });
    const latestConference = JSON.parse(JSON.stringify(latestConferenceData));
    return latestConference;
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  getConferences,
  addConference,
  getConferenceUrl,
  getLatestConference,
};
