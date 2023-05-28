const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoDb = mongoose.createConnection(process.env.MONGODB_URI, mongooseOptions);

mongoDb.once('open', () => {
  console.log(`Mongo Database connected successfully`);
});

mongoDb.on('error', function (error) {
  console.error(`Error in Mongo connection: ${error}`);
  mongoDb.close();
});

mongoDb.on('close', function () {
  console.log(`Closing Mongo Database...`);
});

module.exports = { mongoDb };
