
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/techno2',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => console.log(" Database is connected now"))
    .catch((err) => console.log(err))

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },

    Mobile_Number: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },

    tokens: {
        type: String,
        required: true
    },
})


const User = mongoose.model('user', userSchema)

module.exports = User;

