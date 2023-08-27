import { BoardInstance, StatusTaskType } from "../../shared/interfaces";
import { ErrorHandle } from "../../shared/utils";

export class UpdateBoardUseCase {
  protected readonly boardPrismaRepository;

  constructor(repository: BoardInstance) {
    this.boardPrismaRepository = repository;
  }

  async execute(id: number, status: StatusTaskType, content?: string) {
    try {
      const tasksIfexists = await this.boardPrismaRepository.findById(id)

      if (!tasksIfexists) {
        throw new ErrorHandle('Taks não existe para ser excluída', 404);
      }

      await this.boardPrismaRepository.updateStatusById(id, StatusTaskType[status], content)

    } catch (err: any) {
      throw new ErrorHandle(err.message, 500);
    }
  }
}