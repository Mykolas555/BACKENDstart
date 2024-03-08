const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "A player must have a name"],
        min: [2, 'name has to have at least two symbols'],
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
    },
    lastName:{
        type:String,
        required:[true, 'A player must have a last name'],
        min: [2, 'last name has to have at least two symbols'],
        match: [/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces']
    },
    age:{
        type:Number,
        required:[true, "A player must have age"],
        min:[18, "Player must be above 18 years old"],
        max:[40, "Player must be below 40 years old"]
    },
    ranking:{
        type:Number,
        required:[true, 'A player must have a ranking'],
        min:[1, "ranking must be above 1"],
        max:[5, "ranking cannot be more than 5"]
    },
    team:{
        type:String,
        required:[true, "A player must belong to a team"],
        match: [/^[a-zA-Z0-9\s]+$/, 'Team name can only contain letters, numbers, and spaces']
    }
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player