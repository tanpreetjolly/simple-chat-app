const mongoose = require('mongoose')

module.exports = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("DB CONNECTED SUCCESSFULLY")
  } catch (error) {
    console.log(error)
    console.log("COULD NOT CONNECT TO DB")
  }
}