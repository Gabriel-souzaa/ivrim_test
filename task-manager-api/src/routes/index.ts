import { Router } from "express";
import { BoardController } from "../modules/board/board.controller";

const router = Router();

const boardController = new BoardController();

router.post('/', boardController.execute);
router.get('/list', boardController.index);
router.post('/list/:id', boardController.delete);
router.put('/list/:id', boardController.update);


export { router }