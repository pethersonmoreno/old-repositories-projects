import React, { useState } from 'react';
import axios from 'axios';
import validateTask from 'validator-task';

function App() {
  const [taskName, setTaskname] = useState('');
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        const task = {
          name: taskName
        };
        validateTask(task)
          .then(() => {
            axios
              .post("http://localhost:3001/validateTask", task)
              .then(res => {
                window.alert('Success: ' + res.data)
              })
              .catch(error => {
                const errorMessage = (error.response && error.response.data ? error.response.data : error.message)
                window.alert('Fail (API): ' + errorMessage);
              })
          })
          .catch(error => {
            window.alert('Fail (Frontend): ' + error.message);
          })
      }}>
        <label>Task Name:
          {" "}
          <input
            autoFocus
            placeholder="Task Name"
            name="taskName"
            value={taskName}
            onChange={(event) => setTaskname(event.target.value)} />
        </label>
        {" "}
        <button type="submit">Verificar</button>
      </form>

    </div>
  );
}

export default App;
