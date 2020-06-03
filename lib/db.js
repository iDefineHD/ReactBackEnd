const mongoose = require("mongoose");

const db = async () => {
  try {
    
   await mongoose.connect(
      "mongodb+srv://Ashley:pepexdpoggers@ashtestmongo-vti14.azure.mongodb.net/new?retryWrites=true",
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
    )
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = db;
