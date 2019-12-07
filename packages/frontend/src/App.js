import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';

function App() {
  const [taskName, setTaskname] = useState('');
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        axios
          .post("http://localhost:3001/validateTask", {
            name: taskName
          })
          .then(res => {
            window.alert('Success: ' + res.data)
          })
          .catch(error => {
            const errorMessage = (error.response && error.response.data ? error.response.data : error.message)
            window.alert('Fail: ' + errorMessage);
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
