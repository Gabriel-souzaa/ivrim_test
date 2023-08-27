import { BoardInstance, ITasks } from "../../shared/interfaces";
import { ErrorHandle } from "../../shared/utils";

export class MakeBoardUseCase {
  protected readonly boardPrismaRepository;

  constructor(repository: BoardInstance) {
    this.boardPrismaRepository = repository;
  }

  async execute(data: ITasks): Promise<void> {
    try {
      if (!data.content) {
        throw new ErrorHandle('Adiciona o nome da terefa.', 404);
      }

      await this.boardPrismaRepository.create(data);

    } catch (err: any) {
      throw new ErrorHandle(err.message, err.statusCode);
    }
  }
}