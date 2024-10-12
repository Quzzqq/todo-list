import { Button, ButtonGroup, Checkbox } from "@mui/material";
import styles from "./Tasks.module.css";
import { ITasksTodos } from "./types/todos";
import { useEffect, useState } from "react";
import { handleDelete } from "./utils/handleDelete/handleDelete";
import { handleComplete } from "./utils/handleComplete/handleComplete";
import { handleSetFilter } from "./utils/handleSetFilter/handleSetFilter";

const Tasks: React.FC<ITasksTodos> = ({ todos, setTodos }) => {
  const [filterTodos, setFilterTodos] = useState<
    "All" | "Active" | "Completed"
  >("All");

  
  return (
    <div>
      <div className={styles.btnsGroup}>
        <ButtonGroup color="secondary" aria-label="Medium-sized button group">
          {[
            <Button
              className={styles.btnFilter}
              onClick={() => handleSetFilter("All", setFilterTodos)}
              style={"All" === filterTodos ? { background: "#df87ff" } : {}}
            >
              All
            </Button>,
            <Button
              className={styles.btnFilter}
              onClick={() => handleSetFilter("Active", setFilterTodos)}
              style={"Active" === filterTodos ? { background: "#df87ff" } : {}}
            >
              Active
            </Button>,
            <Button
              className={styles.btnFilter}
              onClick={() => handleSetFilter("Completed", setFilterTodos)}
              style={
                "Completed" === filterTodos ? { background: "#df87ff" } : {}
              }
            >
              Completed
            </Button>,
          ]}
        </ButtonGroup>
      </div>
      <div>
        {todos.map(
          (elem, index) =>
            (filterTodos === "All" ||
              (filterTodos === "Active" ? false : true) === elem.completed) && (
              <div key={index} className={styles.areaTodo}>
                <Checkbox
                  checked={elem.completed}
                  color="success"
                  onChange={() => handleComplete(elem, setTodos)}
                  className={styles.checkBox}
                />
                <input
                  type="text"
                  value={elem.name}
                  disabled
                  className={styles.todoName}
                  style={
                    elem.completed ? { textDecoration: "line-through" } : {}
                  }
                />
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  className={styles.deleteTodo}
                  onClick={() => handleDelete(elem, todos, setTodos)}
                  style={{
                    backgroundColor: "#ffc0c0",
                    color: "#000",
                    font: "400 14px Montserrat",
                  }}
                >
                  Delete
                </Button>
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default Tasks;
