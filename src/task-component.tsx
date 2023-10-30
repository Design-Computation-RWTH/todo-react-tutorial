import { Task } from "./types";

type TaskComponentProps = {
  task: Task;
  index: number;
  onChange: (newStatus: "open" | "in-progress" | "done", index: number) => void;
};

export function TaskComponent(props: TaskComponentProps) {
  function handleChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange(
      event.target.value as "open" | "in-progress" | "done",
      props.index
    );
  }

  return (
    <div style={taskCard} key={props.index}>
      <div>Title: {props.task.title}</div>
      <div>Description: {props.task.description}</div>
      <select value={props.task.status} onChange={handleChangeStatus}>
        <option>open</option>
        <option>in-progress</option>
        <option>done</option>
      </select>
    </div>
  );
}

const taskCard: React.CSSProperties = {
  fontSize: 16,
  padding: 16,
  width: 200,
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
  borderWidth: 1,
  borderColor: "black",
  borderStyle: "solid",
  margin: 8,
};
