import { useState } from "react";
import { useTasks } from "../../../contexts/tasks";
import { verifyStatusByIndex } from "../../../hook/verifyStatus";
import { createBoarTasks } from "../../../services/board-tasks.service";
import Loading from "../../Loading";

import "../../../styles/forms.css";

export default function FormCreate({ listIndex, setIsModalOpen }) {
  const statusTask = verifyStatusByIndex(listIndex);
  const { getList } = useTasks();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    colorTask: '',
    status: statusTask
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
    setLoading(true)

    try {
      const response = await createBoarTasks(formData);

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
        <button type="submit" className="submit-button">{loading ? <Loading /> : 'Enviar'}</button>
      </form>
    </div>
  )
}