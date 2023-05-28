const { config } = require('dotenv');
config();

const express = require('express');
const app = express();
const passport = require('passport');

const router = require('./controller/router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

router(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
