import { BoardCacheMemoryRepository } from "../../../data/cacheMemory/board-cache-memory.repository";
import { ITasks } from "../../../shared/interfaces";
import { ErrorHandle } from "../../../shared/utils";
import { DeleteBoardUseCase } from "../delete-board.usecade";
import { DisplayBoardUseCase } from "../display-board.usecase";
import { MakeBoardUseCase } from "../make-board.usecase";
import { UpdateBoardUseCase } from "../update-board.usecase";

describe('Board Controller', () => {
  let displayBoardUseCase: any;
  let makeBoardUseCase: any;
  let deleteBoardUseCase: any;
  let updateBoardUseCase: any;

  beforeAll(async () => {
    displayBoardUseCase = new DisplayBoardUseCase(new BoardCacheMemoryRepository());
    makeBoardUseCase = new MakeBoardUseCase(new BoardCacheMemoryRepository());
    deleteBoardUseCase = new DeleteBoardUseCase(new BoardCacheMemoryRepository());
    updateBoardUseCase = new UpdateBoardUseCase(new BoardCacheMemoryRepository());
  });

  describe('Display tasks from the board', () => {
    it('should return 4 tasks from the board', async () => {
      const response = await displayBoardUseCase.execute();
      expect(response.length).toBe(4);
    });
  });

  describe('Make tasks from the board', () => {
    it('should create tasks from the board', async () => {
      const data: ITasks = {
        id: 5,
        content: 'Novo Card',
        labels: ['#000'],
        status: 'DOING',
      }

      await makeBoardUseCase.execute(data);

      const response = await displayBoardUseCase.execute();

      expect(response.length).toBe(5);
    });
  });

  describe('Update task from the board', () => {
    it('should delete task by id from the board', async () => {
      await deleteBoardUseCase.execute(1);
    });

    it('should delete task by id from the board - Taks não existe para ser excluída', async () => {
      await expect(deleteBoardUseCase.execute(100)).rejects.toThrow(
        new ErrorHandle('Taks não existe para ser excluída', 404),
      );
    });
  });

  describe('Update tasks from the board', () => {
    it('should update taks from the board by ID', async () => {
      await updateBoardUseCase.execute(1, 'DONE', 'Nome Alterado');
    });

    it('should update taks from the board by ID - Taks não existe para ser excluída', async () => {
      await expect(updateBoardUseCase.execute(100)).rejects.toThrow(
        new ErrorHandle('Taks não existe para ser excluída', 404),
      );
    });
  });
});
