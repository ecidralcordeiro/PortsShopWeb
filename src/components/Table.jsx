import React, { useEffect, useState } from "react";
import "./styles/Style.css";
import EditQuestionModal from "./pages/question/EditQuestionModal";
import {CiTrash} from 'react-icons/ci';
import {CiEdit} from 'react-icons/ci'

function Table() {
  const [data, setData] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);

  useEffect(() => {
    fetch("https://192.168.114.79:7101/question")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handlePause = (id) => {
    const updatedData = data.map((item) => {
      if (item.qeS_PK_idQuestion === id) {
        return { ...item, qeS_status: "paused" };
      } else {
        return item;
      }
    });
    setData(updatedData);
  };

  const handleEdit = (question) => {
    setEditQuestion(question);
  };

  const handleClose = () => {
    setEditQuestion(null);
  };

  const handleSave = (updatedQuestion) => {
    const updatedData = data.map((item) => {
      if (item.qeS_PK_idQuestion === updatedQuestion.qeS_PK_idQuestion) {
        return updatedQuestion;
      } else {
        return item;
      }
    });
    setData(updatedData);
    setEditQuestion(null);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.qeS_PK_idQuestion !== id);
    setData(updatedData);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Status</th>
            <th></th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.qeS_PK_idQuestion}>
              <td>{item.qeS_PK_idQuestion}</td>
              <td>{item.qeS_description}</td>
              <td>{item.qeS_status}</td>
              <td>
                {item.qeS_status === "active" && (
                  <button
                    className="btn btn-warning"
                    onClick={() => handlePause(item.qeS_PK_idQuestion)}
                  >
                    Pausar
                  </button>
                )}
              </td>
              <td>
                <CiEdit size="30px" onClick={() => handleEdit(item)} />
              </td>
              <td>
                <CiTrash
                  size="30px"
                  className="delete-btn"
                  onClick={() => handleDelete(item.qeS_PK_idQuestion)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editQuestion && (
        <EditQuestionModal
          question={editQuestion}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default Table;
