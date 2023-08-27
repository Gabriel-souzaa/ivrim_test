import { useState } from 'react';
import ModalTaks from 'react-modal';
import '../../styles/globalcss.css';

export default function ModalUpdate({ isModalOpen, setIsModalOpen, data }) {

  const [formData, setFormData] = useState({
    task: '',
    colorTask: '',
    status: ''
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
      console.log("Fomulario")

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
        <h2>Atualizar Tarefa: {data.content}</h2>
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
          <label>
            País:
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Selecione um status</option>
              <option value="TODO">Tarefas</option>
              <option value="DOING">Fazendo</option>
              <option value="PAUSED">Pausado</option>
              <option value="DONE">Concluído</option>
            </select>
          </label>
          <br />
          <span className='error'>{message}</span>
          <br />
          <button type="submit" className="submit-button">Atualizar</button>
        </form>
      </div>
    </ModalTaks>
  );
}