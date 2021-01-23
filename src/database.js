const mongoose = require('mongoose');
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATBASE } = process.env;


process.env.NOTES_APP_MONGODB_URI = process.env.NOTES_APP_MONGODB_URI || `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATBASE}`;

mongoose.connect(process.env.NOTES_APP_MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));