const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../utils/config');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.MONGO_URL)
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
connectDB()

autoIncrement.initialize(mongoose.connection);

const db = {
    controllers: require('./controllers'),
    models: require('./models')
};

module.exports = db;


