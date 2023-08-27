import { useState } from 'react';
import ModalTaks from 'react-modal';
import '../../styles/globalcss.css';
import { createBoarTasks } from '../../services/board-tasks.service';
import { verifyStatusByIndex } from '../../hook/verifyStatus';

export default function Modal({ isModalOpen, setIsModalOpen, listIndex }) {
  const statusTask = verifyStatusByIndex(listIndex);

  const [formData, setFormData] = useState({
    task: '',
    colorTask: '',
    status: statusTask
  });

  const [message, setMessage] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createBoarTasks(formData);

      if (response.data.success) {
        setIsModalOpen(false);
        window.location.reload();
      }

    } catch (err) {
      setMessage(err.response.data.message);
      console.log(err)
    }
  };

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
      <span className="close" onClick={closeModal}>&times;</span>
      <div className="form-container">
        <h2>Criar Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Tarefa:
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Cor de etiqueta:
            <input
              type="text"
              name="colorTask"
              value={formData.colorTask}
              onChange={handleInputChange}
              className="input-field"
            />
          </label>
          <br />
          <span className='error'>{message}</span>
          <br />
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </ModalTaks>
  );
}