import { v4 as uuidv4 } from "uuid";
import GameModel from "../models/game.js";


const GET_ALL_GAMES = async (req, res) => {
    try {
      const games = await GameModel.find()//({ userId: req.body.userId });
      return res.json({ games: games });
    } catch (err) {
      console.log("HANDLED ERROR: ", err);
      return res.status(500).json({ message: "error happend" });
    }
  };

  /*export const GET_GAME_BY_ID = async (req, res) => {
    try {
      const game = await GameModel.findOne({ id: req.params.id });
  
      return res.status(200).json({ game: game });
    } catch (err) {
      console.log(err);
    }
  };*/
  
  
  const INSERT_GAME = async (req, res) => {
    try {
      const game = new GameModel({
        id: uuidv4(),
        ...req.body,
      });
  
      console.log(game)
  
      const response = await game.save();
  
      // await TaskGroupModel.findByIdAndUpdate(req.params.groupId, {
      //   $push: { tasks_ids: task.id },
      // });
  
      return res
        .status(201)
        .json({ status: "Game was added", response: response });
    } catch (err) {
      console.log("HANDLED ERROR: ", err);
      return res.status(500).json({ message: "error happend" });


    }
  };
  
  const GET_GAME_BY_ID = async (req, res) => {
    try {
      const game = await GameModel.findById(req.params.id);
  
      if (!game) {
        return res.status(404).json({ message: "game not exist" });
      }
  
      return res.status(200).json({ game: game });
    } catch (err) {
      console.log("HANDLED ERROR: ", err);
      return res.status(500).json({ message: "error happend" });
    }
  };

  const GET_ALL_USER_GAMES = async (req, res) => {
    try {
      const games = await GameModel.find({ userId: req.body.userId });
  
      if (!games.length) {
        return res
          .status(404)
          .json({ message: "this user does  have any game" });
      }
  
      return res.status(200).json({ games: games });
    } catch (err) {
      console.log(err);
    }
  };
  
   const DELETE_GAME_BY_ID = async (req, res) => {
    try {
      const game = await GameModel.findOne({ id: req.params.id });
  
      if (game.userId !== req.body.userId) {
        return res
          .status(401)
          .json({ message: "this game does not belong to you" });
      }
  
      const response = await GameModel.deleteOne({ id: req.params.id });
  
      return res.status(200).json({ response: response });
    } catch (err) {
      console.log(err);
    }
  };






  export {
    GET_ALL_GAMES,
    GET_GAME_BY_ID,
    INSERT_GAME,
    GET_ALL_USER_GAMES,
    DELETE_GAME_BY_ID
}