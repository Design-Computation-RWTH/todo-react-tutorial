import { ActionIcon, Card, Modal, Paper, Space, Title } from "@mantine/core";
import React, { SetStateAction } from "react";
import { Task } from "../types";
import { TaskComponent } from "./task-component";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { TaskModal } from "./task-modal";

type TaskColumnProps = {
  status: "open" | "in-progress" | "done";
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
};

export function TaskColumn(props: TaskColumnProps) {
  const [opened, { open, close }] = useDisclosure();

  function changeStatus(
    newStatus: "open" | "in-progress" | "done",
    index: number
  ) {
    const newTasks = [...props.tasks];
    newTasks[index].status = newStatus;
    props.setTasks(newTasks);
  }

  function handleDelete(index: number) {
    const newTasks = [...props.tasks];
    newTasks.splice(index, 1);
    props.setTasks(newTasks);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={"Add Task with status" + " '" + props.status + "'"}
      >
        <TaskModal
          tasks={props.tasks}
          setTasks={props.setTasks}
          status={props.status}
          handleSubmit={close}
        />
      </Modal>
      <Card shadow="sm" radius="lg" withBorder p="xl" style={todoColumn}>
        <Card.Section style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Space />
            <Title order={3}>{props.status.toUpperCase()}</Title>
            <ActionIcon
              variant="transparent"
              color="blue"
              radius="xl"
              onClick={open}
            >
              <IconPlus />
            </ActionIcon>
          </div>
        </Card.Section>
        {props.tasks.map(
          (task, i) =>
            task.status === props.status && (
              <TaskComponent
                task={task}
                index={i}
                key={i}
                onChange={changeStatus}
                onDelete={handleDelete}
              />
            )
        )}
      </Card>
    </>
  );
}

const todoColumn: React.CSSProperties = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  padding: 10,
  margin: 10,
  alignContent: "center",
  alignItems: "center",
  display: "flex",
};
