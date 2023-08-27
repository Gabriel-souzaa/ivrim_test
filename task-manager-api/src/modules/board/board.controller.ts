import { NextFunction, Request, Response } from "express";
import { DisplayBoardUseCase } from "./display-board.usecase";
import { BoardPrismaRepository } from "../../data/remote/board-prisma.repository";
import { MakeBoardUseCase } from "./make-board.usecase";
import { ITasks } from "../../shared/interfaces";
import { DeleteBoardUseCase } from "./delete-board.usecade";
import { UpdateBoardUseCase } from "./update-board.usecase";

class BoardController {

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const body: ITasks = request.body;

      const makeBoardUseCase = new MakeBoardUseCase(new BoardPrismaRepository())

      await makeBoardUseCase.execute(body);

      response.status(201).json({
        success: true
      })
    } catch (err) {
      next(err);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const displayBoardUseCase = new DisplayBoardUseCase(new BoardPrismaRepository())

      const data = await displayBoardUseCase.execute();

      response.status(200).json({
        success: true,
        data
      })
    } catch (err) {
      next(err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const deleteBoardUseCase = new DeleteBoardUseCase(new BoardPrismaRepository())

      await deleteBoardUseCase.execute(Number(id));

      response.status(200).json({
        success: true
      })
    } catch (err) {
      next(err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const { status, content } = request.body;

      const updateBoardUseCase = new UpdateBoardUseCase(new BoardPrismaRepository())

      await updateBoardUseCase.execute(Number(id), status, content);

      response.status(200).json({
        success: true
      })
    } catch (err) {
      next(err);
    }
  }
}

export { BoardController }