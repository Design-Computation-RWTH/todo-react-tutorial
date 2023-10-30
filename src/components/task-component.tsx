import { IconTrash } from "@tabler/icons-react";
import { Task } from "../types";
import { ActionIcon, Card, NativeSelect, Text, Title } from "@mantine/core";

type TaskComponentProps = {
  task: Task;
  index: number;
  onChange: (newStatus: "open" | "in-progress" | "done", index: number) => void;
  onDelete: (index: number) => void;
};

export function TaskComponent(props: TaskComponentProps) {
  function handleChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange(
      event.target.value as "open" | "in-progress" | "done",
      props.index
    );
  }

  function handleDelete() {
    props.onDelete(props.index);
  }

  return (
    <Card
      style={taskCard}
      shadow="sm"
      radius="lg"
      c="blue"
      withBorder
      p="xl"
      key={props.index}
    >
      <Card.Section>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Title order={3}>{props.task.title}</Title>
          <ActionIcon
            variant="transparent"
            color="blue"
            radius="xl"
            onClick={handleDelete}
          >
            <IconTrash />
          </ActionIcon>
        </div>
      </Card.Section>

      <Text size="sm" c="dimmed">
        {props.task.description}
      </Text>
      <NativeSelect value={props.task.status} onChange={handleChangeStatus}>
        <option>open</option>
        <option>in-progress</option>
        <option>done</option>
      </NativeSelect>
    </Card>
  );
}

const taskCard: React.CSSProperties = {
  fontSize: 16,
  padding: 16,
  width: "100%",
  margin: 8,
};
