import { createContext, useContext, useEffect, useState } from 'react';
import produce from 'immer';
import { getBoardTasks, updateBoardTasks } from '../services/board-tasks.service';
import { verifyStatusByIndex } from '../hook/verifyStatus';

export const TasksContext = createContext({
  lists: [],
  move: () => { }
});

export const TasksProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const data = await getBoardTasks();

    setLists(
      [
        {
          title: 'Tarefas',
          creatable: true,
          cards: data.filter((item) => item.status === "TODO")
        },
        {
          title: 'Fazendo',
          creatable: false,
          cards: data.filter((item) => item.status === "DOING")
        },
        {
          title: 'Pausado',
          creatable: false,
          cards: data.filter((item) => item.status === "PAUSED")
        },
        {
          title: 'Concluído',
          creatable: false,
          done: true,
          cards: data.filter((item) => item.status === "DONE")
        },
      ]
    )
  }

  const move = async (fromList, toList, from, to) => {
    const status = verifyStatusByIndex(toList);
    const task = lists[fromList].cards[from];

    await updateBoardTasks(task.id, status);

    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      if (dragged.id) {
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }
    }))
  }

  return (
    <TasksContext.Provider
      value={{
        lists,
        move
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext);
  return context;
}