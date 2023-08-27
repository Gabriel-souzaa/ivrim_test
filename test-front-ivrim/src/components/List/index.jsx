import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import Fake from '../Card/fake';

import { Container } from './styles';
import Modal from '../Modal';
import { useState } from 'react';

export default function List({ data, index: listIndex }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container done={data.done}>
        <header>
          <h2>{data.title}</h2>
          {data.creatable && (
            <button type="button">
              <MdAdd size={24} color="#FFF" onClick={openModal} />
            </button>
          )}
        </header>
        <ul style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          {data.cards.map((card, index) => (
            <Card
              key={card.id}
              listIndex={listIndex}
              index={index}
              data={card}
            />
          ))}
          <Fake index={data.cards.length} listIndex={listIndex} />
        </ul>
      </Container>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} listIndex={listIndex} />
    </>
  );
}
