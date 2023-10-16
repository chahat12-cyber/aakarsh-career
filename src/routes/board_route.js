const express = require('express');
const boardRoute= express.Router();
const BoardController = require('../controller/board_controller');

boardRoute.post("/createBoard", BoardController.createBoard);
boardRoute.get("/fetchBoards", BoardController.fetchAllBoard);
boardRoute.put("/updateBoardData/:id", BoardController.updateBoardData);
boardRoute.delete("/deleteBoardData/:id", BoardController.deleteBoardData);


module.exports = boardRoute;