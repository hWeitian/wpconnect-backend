const db = require("../db/models");
const { Op } = require("sequelize");

const {
  Speaker,
  Topic,
  TopicSpeaker,
  ConferenceSpeaker,
  Conference,
  Session,
  SessionSpeaker,
  Room,
} = db;

const {
  getConferenceUrl,
  getLatestConference,
} = require("../controllers/Conferences");

const {
  updateUserInAuth,
  addUserToAuth,
  getUserFromAuth,
  deleteUserFromAuth,
} = require("../utils/auth");

const {
  createPost,
  getPostCategoriesId,
  deletePost,
  updateOnePost,
} = require("../utils/wordpress");

const getContacts = async (req, res) => {
  try {
    const contacts = await Speaker.findAll();
    return res.status(200).json(contacts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addContact = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    title,
    email,
    organisation,
    biography,
    photoUrl,
    isAdmin,
  } = req.body;
  try {
    const speaker = await Speaker.create({
      firstName,
      lastName,
      country,
      title,
      email,
      organisation,
      biography,
      photoUrl,
      isAdmin,
    });

    if (isAdmin) {
      const response = await addUserToAuth(firstName, email);
    }

    return res.status(200).json(speaker);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Delete a contact from the whole system
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { isAdmin, email } = req.body;
  // console.log("contactId: ", contactId);
  try {
    // Get latest conference's wordpress url
    const latestConference = await getLatestConference();
    const wordPressUrl = latestConference[0].wordpressUrl;
    // console.log("latestConference", latestConference);
    // console.log("wordpressUrl", wordPressUrl);

    // Find if speaker has been published to latest wordpress site
    const speakerDetails = await ConferenceSpeaker.findAll({
      where: {
        [Op.and]: [
          { speakerId: contactId },
          { conferenceId: latestConference[0].id },
        ],
      },
    });
    // console.log("speakerDetails:", speakerDetails);

    // If speaker has been published to wordpress, delete speaker from wordpress
    if (speakerDetails.length > 0) {
      const speakerPostId = speakerDetails[0].dataValues.speakerPostId;
      deletePost(speakerPostId, wordPressUrl);
    }

    // Remove speaker from database
    await Speaker.destroy({
      where: { id: contactId },
    });

    // Remove speaker from Auth0 is speaker is and admin
    if (isAdmin) {
      const userId = await getUserFromAuth(email);
      const response = await deleteUserFromAuth(userId);
    }
    return res.status(200).json("Speaker deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Function to get a specific contact
// Includes all participated conference and sessions
const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const speaker = await Speaker.findByPk(contactId, {
      include: [
        {
          model: Conference,
          include: [
            {
              model: Session,
              include: [
                {
                  model: Speaker,
                  where: { id: contactId },
                  through: { attributes: ["role"] },
                  required: false,
                },
                {
                  model: Topic,
                  include: [{ model: Speaker, where: { id: contactId } }],
                },
                {
                  model: Room,
                },
              ],
              order: [["date", "ASC"]],
            },
          ],
        },
      ],
      order: [[db.Conference, db.Session, "startTime", "ASC"]],
    });

    // Convert data into json for easy manipulation
    const finalSpeaker = speaker.toJSON();

    // Remove sessions not related to speaker
    finalSpeaker.Conferences.map((conference) => {
      for (let i = 0; i < conference.Sessions.length; i++) {
        if (
          conference.Sessions[i].Speakers.length <= 0 &&
          conference.Sessions[i].Topics.length <= 0
        ) {
          if (conference.Sessions.length === 1) {
            conference.Sessions = [];
          } else {
            conference.Sessions.splice(i, 1);
            i--;
          }
        }
      }
    });

    return res.status(200).json(finalSpeaker);
  } catch (err) {
    return res.status(500).json(err);
  }
};

async function updateContact(req, res) {
  const { contactId } = req.params;
  console.log("at update speaker");
  const {
    firstName,
    lastName,
    country,
    title,
    email,
    organisation,
    biography,
    photoUrl,
    isAdmin,
    adminChanged,
  } = req.body;

  try {
    const latestConference = await getLatestConference();
    const conferenceId = latestConference[0].id;
    const wordPressUrl = latestConference[0].wordpressUrl;

    const updatedSpeaker = await Speaker.update(
      {
        firstName,
        lastName,
        country,
        title,
        email,
        organisation,
        biography,
        photoUrl,
        isAdmin,
      },
      {
        where: { id: contactId },
      }
    );

    // Check if there is a change in admin status and update the database accordingly
    if (adminChanged) {
      if (isAdmin) {
        await addUserToAuth(firstName, email);
      } else {
        const userId = await getUserFromAuth(email);
        const response = await deleteUserFromAuth(userId);
      }
    } else if (isAdmin) {
      const userId = await getUserFromAuth(email);
      const response = await updateUserInAuth(userId, firstName);
    }

    // Get the latest conference id and url
    // Update wordpress speakers
    const speakerToUpdate = await ConferenceSpeaker.findOne({
      where: {
        conferenceId: conferenceId,
        speakerId: contactId,
      },
      attributes: ["speakerId", "speakerPostId", "speakerPostLink"],
    });

    if (speakerToUpdate) {
      const wordPressSpeakerToUpdate = speakerToUpdate.toJSON();

      // Update speaker info on wordpress. Only update to the latest conference.
      await updateWordPressSpeakers([], [], conferenceId, wordPressUrl, [
        wordPressSpeakerToUpdate,
      ]);
    }

    return res.json(updatedSpeaker);
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  getContacts,
  addContact,
  deleteContact,
  getContact,
  updateContact,
};
