import { BoardInstance } from "../../shared/interfaces";
import { ErrorHandle } from "../../shared/utils";

export class DisplayBoardUseCase {
  protected readonly boardPrismaRepository;

  constructor(repository: BoardInstance) {
    this.boardPrismaRepository = repository;
  }

  async execute() {
    try {
      const data = await this.boardPrismaRepository.list();
      return data;
    } catch (err: any) {
      throw new ErrorHandle(err.message, 500);
    }
  }
}