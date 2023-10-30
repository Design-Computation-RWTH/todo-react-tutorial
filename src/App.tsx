import React from "react";
import { Task } from "./types";
import { TaskComponent } from "./task-component";

export default function App() {
  const [taskTitle, setTaskTitle] = React.useState<string>("");
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [taskStatus, setTaskStatus] = React.useState<
    "open" | "in-progress" | "done"
  >("open");
  const [taskDescription, setTaskDescription] = React.useState<string>("");

  const [openTaskCount, setOpenTaskCount] = React.useState<number>(0);
  const [inProgressTaskCount, setInProgressTaskCount] =
    React.useState<number>(0);
  const [doneTaskCount, setDoneTaskCount] = React.useState<number>(0);

  React.useEffect(() => {
    setOpenTaskCount(tasks.filter((task) => task.status === "open").length);
    setInProgressTaskCount(
      tasks.filter((task) => task.status === "in-progress").length
    );
    setDoneTaskCount(tasks.filter((task) => task.status === "done").length);
  }, [tasks]);

  function handleSubmit() {
    setTasks([
      ...tasks,
      { title: taskTitle, status: taskStatus, description: taskDescription },
    ]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("open");
  }

  function changeStatus(
    newStatus: "open" | "in-progress" | "done",
    index: number
  ) {
    const newTasks = [...tasks];
    newTasks[index].status = newStatus;
    setTasks(newTasks);
  }

  return (
    <div style={appContainer}>
      <div style={headerContainer}>My Todo App</div>
      <div style={inputContainer}>
        <input
          value={taskTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskTitle(event.target.value)
          }
          type="text"
          placeholder="Enter Task Title"
        />
        <input
          value={taskDescription}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskDescription(event.target.value)
          }
          type="text"
          placeholder="Enter Task Description"
        />
        <select
          value={taskStatus}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setTaskStatus(event.target.value as "open" | "in-progress" | "done")
          }
        >
          <option>open</option>
          <option>in-progress</option>
          <option>done</option>
        </select>
        <button onClick={handleSubmit}>Add Task</button>
      </div>
      <div style={taskContainer}>
        <div style={todoColumn}>
          Open
          <div>
            {tasks.map(
              (task, i) =>
                // only show open tasks
                task.status === "open" && (
                  <TaskComponent
                    task={task}
                    index={i}
                    key={i}
                    onChange={changeStatus}
                  />
                )
            )}
          </div>
        </div>
        <div style={todoColumn}>
          In Progress{" "}
          <div>
            {tasks.map(
              (task, i) =>
                // only show in-progress tasks
                task.status === "in-progress" && (
                  <TaskComponent
                    task={task}
                    index={i}
                    key={i}
                    onChange={changeStatus}
                  />
                )
            )}
          </div>
        </div>
        <div style={todoColumn}>
          Done
          <div>
            {tasks.map(
              (task, i) =>
                // only show done tasks
                task.status === "done" && (
                  <TaskComponent
                    task={task}
                    index={i}
                    key={i}
                    onChange={changeStatus}
                  />
                )
            )}
          </div>
        </div>
      </div>
      <div style={summaryContainer}>
        <div>Tasks open: {openTaskCount} </div>
        <div>Tasks in-progress: {inProgressTaskCount}</div>
        <div>Tasks done: {doneTaskCount}</div>
      </div>
    </div>
  );
}

const todoColumn: React.CSSProperties = {
  flex: 1,
  flexDirection: "column",
  backgroundColor: "lightgray",
  padding: 10,
  margin: 10,
  borderRadius: 10,
  borderColor: "black",
  borderWidth: 3,
  borderStyle: "solid",
  alignContent: "center",
  alignItems: "center",
  display: "flex",
  fontSize: 20,
  fontWeight: "bold",
};

const inputContainer: React.CSSProperties = {
  flexDirection: "row",
  display: "flex",
  margin: 20,
  justifyContent: "center",
};

const appContainer: React.CSSProperties = {
  flex: 1,
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  display: "flex",
};

const headerContainer: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  display: "flex",
  margin: 20,
  fontSize: 30,
  fontWeight: "bold",
};

const taskContainer: React.CSSProperties = {
  flex: 1,
  flexDirection: "row",
  display: "flex",
};

const summaryContainer: React.CSSProperties = {
  flexDirection: "column",
  display: "flex",
  margin: 20,
};
