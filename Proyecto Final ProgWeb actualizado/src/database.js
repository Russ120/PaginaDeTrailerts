const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

// mongoose.connect(MONGODB_URI, {
//     useUniFiedTopology: true,
//     useNewUrlParser: true
// })
//     .then(db => console.log('Database Is Connected'))
//     .catch(err => console.log(err));

const connectToMongo = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
};

connectToMongo();