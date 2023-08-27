import { prisma } from "../../configs/database"
import { BoardInstance, ITasks, StatusTaskType } from "../../shared/interfaces";

export class BoardPrismaRepository implements BoardInstance {
  protected readonly prismaRepository

  constructor() {
    this.prismaRepository = prisma;
  }

  async list(): Promise<ITasks[]> {
    const response = await this.prismaRepository.tasksBoard.findMany();
    return response;
  }

  async create(data: ITasks): Promise<void> {
    await this.prismaRepository.tasksBoard.create({
      data: {
        content: data.content,
        labels: data.labels,
        user_profile: data.user_profile,
        status: StatusTaskType[data.status]
      }
    })
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaRepository.tasksBoard.delete({
      where: {
        id
      }
    });
  }

  async updateStatusById(id: number, status: StatusTaskType, content?: string): Promise<void> {
    await this.prismaRepository.tasksBoard.update({
      where: {
        id
      },
      data: {
        status: StatusTaskType[status],
        content
      }
    })
  }

  async findById(id: number): Promise<ITasks | null> {
    const response = await this.prismaRepository.tasksBoard.findFirst({
      where: {
        id
      }
    });

    return response;
  }
}