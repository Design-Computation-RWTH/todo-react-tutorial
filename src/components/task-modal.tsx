import { Button, Space, TextInput } from "@mantine/core";
import React, { SetStateAction } from "react";
import { Task } from "../types";

type TaskModalProps = {
  status: "open" | "in-progress" | "done";
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  handleSubmit: () => void;
};

export function TaskModal(props: TaskModalProps) {
  const [taskDescription, setTaskDescription] = React.useState<string>("");
  const [taskTitle, setTaskTitle] = React.useState<string>("");

  function handleSubmit() {
    props.setTasks([
      ...props.tasks,
      { title: taskTitle, status: props.status, description: taskDescription },
    ]);
    setTaskTitle("");
    setTaskDescription("");
    props.handleSubmit();
  }

  return (
    <div style={inputContainer}>
      <TextInput
        value={taskTitle}
        label="Enter a Title"
        description="Provide a title that describes your task."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(event.target.value)
        }
        type="text"
        placeholder="Enter Task Title"
      />
      <TextInput
        value={taskDescription}
        label="Enter a Description"
        description="Provide a description that describes your task."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTaskDescription(event.target.value)
        }
        type="text"
        placeholder="Enter Task Description"
      />
      <Space h="xl" />
      <Button onClick={handleSubmit}>Add Task</Button>
    </div>
  );
}

const inputContainer: React.CSSProperties = {
  flexDirection: "column",
  display: "flex",
  margin: 20,
  justifyContent: "center",
};
