import { BoardInstance, ITasks, StatusTaskType } from "../../shared/interfaces";
import { TasksMock } from "../mock/tasks.mock";

export class BoardCacheMemoryRepository implements BoardInstance {
  protected dataBoard: ITasks[]

  constructor() {
    this.dataBoard = TasksMock;
  }

  async list(): Promise<ITasks[]> {
    return this.dataBoard;
  }

  async create(data: ITasks): Promise<void> {
    this.dataBoard.push({
      id: 1,
      content: data.content,
      labels: data.labels,
      status: StatusTaskType[data.status],
      user_profile: data.user_profile
    })
  }

  async deleteById(id: number): Promise<void> {
    const data = this.dataBoard.filter((data) => data.id !== id);
    this.dataBoard = data;
  }

  async updateStatusById(id: number, status: StatusTaskType, content?: string): Promise<void> {
    const data = this.dataBoard.find((data) => data.id === id);

    if (data) {
      data.status = StatusTaskType[status];
      if (content)
        data.content = content
    }
  }

  async findById(id: number): Promise<ITasks | undefined> {
    return this.dataBoard.find((data) => data.id === id);
  }
}