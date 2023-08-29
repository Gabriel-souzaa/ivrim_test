import { useState } from "react";
import { useTasks } from "../../../contexts/tasks";
import { updateBoardTasks } from "../../../services/board-tasks.service";
import Loading from "../../Loading";

import "../../../styles/forms.css";

export default function FormUpdate({ data, setIsModalOpen }) {
  const { getList } = useTasks();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    task: data.content,
    status: data.status
  });

  const handleInputChange = event => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await updateBoardTasks(data.id, formData);

      if (response.data.success) {
        getList();
      }

      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
      }, 1000);

    } catch (err) {
      setMessage(err.response.data.message);
      setLoading(false);
      console.log(err)
    }
  };

  return (
    <div className="form-container">
      <h2>Atualizar Tarefa: {data.content}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tarefa:
          <input
            type="task"
            name="task"
            value={formData.task}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
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
        <button type="submit" className="submit-button">{loading ? <Loading /> : 'Atualizar'}</button>
      </form>
    </div>
  )
}