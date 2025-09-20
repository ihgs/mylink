export interface TaskData {
  task: string;
  rank: number;
  status?: string;
}

const listTasks = (): Array<TaskData> => {
  const tasks = localStorage.getItem("mylink_tasks");
  if (!tasks) {
    return [];
  }
  return JSON.parse(tasks);
};
const addTask = (task: string, rank: number) => {
  const tasks = listTasks();
  tasks.push({ task, rank });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const deleteTask = (task: string) => {
  const tasks = listTasks()
    .map((datum) => {
      if (datum.task === task) {
        return undefined;
      } else {
        return datum;
      }
    })
    .filter((datum) => {
      return datum != undefined || datum != null;
    });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const doneTask = (task: string) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { ...datum, status: "done" };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const undoneTask = (task: string) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { task: datum.task, rank: datum.rank };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

const updateTask = (task?: string, rank?: number) => {
  const tasks = listTasks().map((datum) => {
    if (datum.task === task) {
      return { ...datum, rank };
    } else {
      return datum;
    }
  });
  localStorage.setItem("mylink_tasks", JSON.stringify(tasks));
};

export { listTasks, addTask, deleteTask, updateTask, doneTask, undoneTask };
