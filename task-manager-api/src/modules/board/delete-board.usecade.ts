import { BoardInstance } from "../../shared/interfaces";
import { ErrorHandle } from "../../shared/utils";

export class DeleteBoardUseCase {
  protected readonly boardPrismaRepository;

  constructor(repository: BoardInstance) {
    this.boardPrismaRepository = repository;
  }

  async execute(id: number) {
    try {
      const tasksIfexists = await this.boardPrismaRepository.findById(id);

      if (!tasksIfexists) {
        throw new ErrorHandle('Taks não existe para ser excluída', 404);
      }

      await this.boardPrismaRepository.deleteById(id)

    } catch (err: any) {
      throw new ErrorHandle(err.message, 500);
    }
  }
}