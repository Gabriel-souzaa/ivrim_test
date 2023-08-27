import List from '../List';

import { Container } from './styles';
import { useTasks } from '../../contexts/tasks';

export default function Board() {
  const { lists } = useTasks();

  return (
    <Container>
      {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
    </Container>
  );
}
