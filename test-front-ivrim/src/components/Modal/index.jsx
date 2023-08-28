import ModalTaks from 'react-modal';
import '../../styles/globalcss.css';

export default function Modal({ isModalOpen, setIsModalOpen, children }) {

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalTaks
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }
      }}
      overlayClassName='modal-overlay'
      ariaHideApp={false}
    >
      <span className="close-modal" onClick={closeModal}>&times;</span>
      {children}
    </ModalTaks>
  );
}