const fs = require('fs')
const Player = require('../models/playerModel')
const APIFeatures = require('../utils/apiTools')

// get Top Players by ranking
exports.aliasTopPlayers = (req, res, next) => {
    req.query.limit = "10"; 
    req.query.sort = "-ranking";
    req.query.fields = "ranking,name,lastName,team";
    req.query.ranking = { gte: "1", lte: "5" }; 
    next();
};

// get youngest players under age 20
exports.aliasTopYoungestPlayers = (req, res, next) => { 
    req.query.sort = "age";
    req.query.fields = "age,ranking,name,lastName,team";
    req.query.age = { lte: "20" }; 
    next();
};

// get players by team
exports.aliasTeam = (req, res, next) => { 
    const teamName = req.params.team;
    if (teamName) { req.query.team = teamName }
    req.query.sort = "name";
    req.query.fields = "age,ranking,name,lastName,team";
    next();
};

// get all players
exports.getAllPlayers = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const playersData = await new APIFeatures(Player.find(), req.query)
            .filter()
            .sort({name: 1})
            .limitFields()
            .paginate();
        const players = await playersData.query;
        const totalCount = await Player.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        res.status(200).json({
            status: "got all players successfully",
            results: players.length,
            page: page,
            totalPages: totalPages,
            data: { players }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json({
                status: "failed",
                message: err.message
            });
        }
    }
};

// creates new player
exports.createPlayer = async (req, res) =>{
    try{
        const newPlayer = await Player.create(req.body)
        res.status(201).json({
            status: "created player successfuly",
            message: "New Player is created",
            data: {newPlayer}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.getPlayer = async (req, res)=>{
    try{
        const player = await Player.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {player}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.updatePlayer = async (req, res) =>{
    try{
        const player = await Player.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            message: "Player is updated",
            data: {player}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.deletePlayer = async (req, res) =>{
    try{
        await Player.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Player is deleted",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}
