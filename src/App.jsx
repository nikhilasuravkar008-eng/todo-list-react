import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    setTasks(
      tasks.filter((_, index) => index !== indexToDelete)
    );
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];

    updatedTasks[editingIndex].text = editText;

    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText("");
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="header">
        <h1>To-Do List</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index} className="task-item">

            {editingIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                />

                <button onClick={saveEdit}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={
                    item.completed
                      ? "completed"
                      : ""
                  }
                >
                  {item.text}
                </span>

                <div className="buttons">
                  <button
                    onClick={() =>
                      toggleComplete(index)
                    }
                  >
                    {item.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    onClick={() =>
                      startEdit(index)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(index)
                    }
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;