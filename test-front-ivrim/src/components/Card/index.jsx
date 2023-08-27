import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';
import { useTasks } from '../../contexts/tasks';
import ModalUpdate from '../ModalUpdate';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

    console.log(data);
  };

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref));

  return (
    <>
      <Container ref={ref} isDragging={isDragging}>
        <header>
          {data.labels.map(label => <Label key={label} color={label} />)}
        </header>
        <p>{data.content}</p>
        {data.user && <img src={data.user} alt="" />}
        <span className="edit" onClick={openModal}>...</span>
      </Container>
      <ModalUpdate isModalOpen={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)} data={data} />
    </>
  );
}
