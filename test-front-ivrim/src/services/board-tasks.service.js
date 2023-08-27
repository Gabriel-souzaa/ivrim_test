import { Api } from "./api"

export const getBoardTasks = async () => {
  const response = await Api.get('/list')
  return response.data.data;
}

export const createBoarTasks = async (data) => {
  const response = await Api.post('/', {
    content: data.task,
    status: data.status,
    labels: [data.colorTask]
  });
  return response;
}

export const updateBoardTasks = async (id, status) => {
  const response = await Api.put(`/list/${id}`, {
    status
  });
  return response;
}