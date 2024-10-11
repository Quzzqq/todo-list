import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Button } from "@mui/material";
import Tasks from "./Tasks";
import { ITodos } from "./types/todos";
import { handleAdd } from "./utils/handleAdd/handleAdd";

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    const refreshData = localStorage.getItem("todos");
    if (refreshData) {
      setTodos(JSON.parse(refreshData));
    } else
      setTodos([
        {
          name: "Выйти на улицу",
          completed: true,
        },
        {
          name: "Прогуляться",
          completed: false,
        },
      ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className={styles.block}>
      <header className={styles.head}>Todo List</header>
      <hr />
      <div className={styles.inpDiv}>
        <input
          placeholder="Add a new task"
          className={styles.inp}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button
          variant="contained"
          href="#contained-buttons"
          className={styles.saveInp}
          onClick={() => handleAdd(todos, value, setTodos)}
          style={{
            backgroundColor: "#c8fdb1",
            color: "#000",
            font: "400 14px Montserrat",
          }}
        >
          Add
        </Button>
      </div>
      <Tasks todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
