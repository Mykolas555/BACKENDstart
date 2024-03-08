const express = require('express');
const router = express.Router();
const playerController = require("../controllers/playerController")
const authController = require('../controllers/authController')

router.route("/top-10-players")
.get(authController.protect,playerController.aliasTopPlayers, playerController.getAllPlayers)

router.route("/Youngest-Players")
.get(authController.protect,playerController.aliasTopYoungestPlayers, playerController.getAllPlayers)

router.route("/teamPlayers/:team")
.get(authController.protect,playerController.aliasTeam, playerController.getAllPlayers)

router.route("/")
.get(authController.protect, playerController.getAllPlayers)
.post(authController.protect, playerController.createPlayer)

router.route("/:id/card")
.get(authController.protect, playerController.getPlayer)
.patch(authController.protect, playerController.updatePlayer)
.delete(authController.protect, playerController.deletePlayer)

module.exports = router