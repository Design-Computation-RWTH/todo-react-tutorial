import React from "react";
import { Task } from "./types";
// Mantine Imports
import { Button, TextInput, NativeSelect, Text } from "@mantine/core";
import { TaskColumn } from "./components/task-column";

export default function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

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

  return (
    <div style={appContainer}>
      <div style={headerContainer}>My Todo App</div>

      <div style={taskContainer}>
        <TaskColumn status="open" tasks={tasks} setTasks={setTasks} />
        <TaskColumn status="in-progress" tasks={tasks} setTasks={setTasks} />
        <TaskColumn status="done" tasks={tasks} setTasks={setTasks} />
      </div>
      <div style={summaryContainer}>
        <Text>Tasks open: {openTaskCount} </Text>
        <Text>Tasks in-progress: {inProgressTaskCount}</Text>
        <Text>Tasks done: {doneTaskCount}</Text>
      </div>
    </div>
  );
}

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
