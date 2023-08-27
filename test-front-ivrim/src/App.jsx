import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GlobalStyle from './styles/global';

import Header from './components/Header';
import Board from './components/Board';
import { TasksProvider } from './contexts/tasks';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TasksProvider>
        <Header />
        <Board />

        <GlobalStyle />
      </TasksProvider>
    </DndProvider>
  );
}

export default App;
