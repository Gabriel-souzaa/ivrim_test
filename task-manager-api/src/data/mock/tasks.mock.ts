import { ITasks } from "../../shared/interfaces";

export const TasksMock: ITasks[] = [
  {
    id: 1,
    content: 'Estudar módulo 01 de NodeJS',
    labels: ['#7159c1'],
    user_profile: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/profile.png',
    status: 'DOING'
  },
  {
    id: 2,
    content: 'Criar vídeo para o Youtube ensinando a recriar a interface do Pipefy',
    labels: ['#7159c1'],
    status: 'DONE'
  },
  {
    id: 3,
    content: 'Estudar módulo 03 de React Native',
    labels: ['#7159c1'],
    user_profile: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/profile.png',
    status: 'TODO'
  },
  {
    id: 4,
    content: 'Gravar testes e deploy ReactJS',
    labels: ['#7159c1'],
    status: 'DOING'
  },
]