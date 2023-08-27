export interface ITasks {
  id?: number;
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED';
  content: string;
  labels: string[];
  user_profile?: string | null;
  createdAt?: Date;
}

export interface BoardInstance {
  list: () => Promise<ITasks[]>;
  create: (data: ITasks) => Promise<void>;
  updateStatusById: (id: number, status: StatusTaskType, content?: string) => Promise<void>;
  deleteById: (id: number) => Promise<void>;
  findById: (id: number) => Promise<ITasks | undefined | null>;
}

export enum StatusTaskType {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
  PAUSED = 'PAUSED'
}
