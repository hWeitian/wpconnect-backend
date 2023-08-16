const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.BASEURL,
  tokenSigningAlg: "RS256",
});

// importing Routers as created in Sequelize
const conferenceRouter = require("./routes/ConferenceRouter");
const speakerRouter = require("./routes/SpeakerRouter");
const sessionRouter = require("./routes/SessionRouter");

const PORT = process.env.PORT || 3000;

const app = express();

// Enable CORS access to this server
app.use(cors());

// Auth0 authorization
app.use(checkJwt);

// Parsing to json
app.use(express.json());

// using the routers as imported in line 4 above
app.use("/conferences", conferenceRouter);
app.use("/speakers", speakerRouter);
app.use("/sessions", sessionRouter);

app.listen(PORT, () => {
  console.log(`Application listening to port ${PORT}`);
});
