import { useState } from "react";

function App() {
  
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <h1>To-Do List</h1>
    </div>
  );
}

export default App;