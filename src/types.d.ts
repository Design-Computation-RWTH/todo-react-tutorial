export type Task = {
  title: string;
  status: "open" | "in-progress" | "done";
  description?: string;
};
