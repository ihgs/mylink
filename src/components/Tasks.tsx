import { MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  doneTask,
  listTasks,
  TaskData,
  undoneTask,
  updateTask,
} from "../libs/storage";

const uTriangle = `w-0 h-0 border-l-[18px] border-l-transparent border-b-[14px]  border-r-[18px] border-r-transparent`;
const hoveruTriangle = `hover:w-0 h-0 hover:border-l-[18px] hover:border-l-transparent hover:border-b-[14px]  hover:border-r-[18px] hover:border-r-transparent hover:border-slate-700`;
const dTriangle =
  "w-0 h-0 border-l-[18px] border-l-transparent border-t-[14px]  border-r-[18px] border-r-transparent";
const hoverdTriangle =
  "hover:w-0 hover:h-0 hover:border-l-[18px] hover:border-l-transparent hover:border-t-[14px]  hover:border-r-[18px] hover:border-r-transparent hover:border-slate-700";

const Tasks = () => {
  const [tasks, setTasks] = useState<Array<TaskData>>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newRank, setNewRank] = useState<number>(3);
  const [reload, setReload] = useState<object>();

  useEffect(() => {
    const ts = listTasks();
    ts.sort((a: TaskData, b: TaskData) => {
      return b.rank - a.rank;
    });
    setTasks(ts);
  }, [reload]);

  const addNewTask = (event: SyntheticEvent) => {
    event.preventDefault();

    addTask(newTask, newRank);
    setNewTask("");
    setReload({});
  };

  const updateRank = (event: MouseEvent<HTMLDivElement>) => {
    const crank = event.currentTarget.dataset.tip || "0";
    const ctask = event.currentTarget.dataset.task;
    updateTask(ctask, parseInt(crank));
    setReload({});
  };

  const todoOrDone = (status: string | undefined, task: string) => {
    if (status === "done") {
      undoneTask(task);
    } else {
      doneTask(task);
    }
    setReload({});
  };

  return (
    <div>
      <div className="h-6"></div>

      <div>
        <form className="form my-1" onSubmit={addNewTask}>
          <div className="input-group">
            <input
              type="text"
              className="input input-bordered focus:outline-none input-sm"
              placeholder="task"
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            ></input>
            <input
              type="number"
              min="0"
              max="9"
              className="input input-bordered focus:outline-none w-14 input-sm"
              placeholder="rank"
              value={newRank}
              onChange={(e) => {
                setNewRank(e.target.valueAsNumber);
              }}
            ></input>
            <button type="submit" className="btn btn-sm" onClick={addNewTask}>
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="text-left pl-2 pt-4">
        {tasks.map((task) => {
          return (
            <div key={task.task} className="flex w-full p-1">
              <span
                className={`mr-auto  ${
                  task.status === "done" ? "line-through decoration-2" : ""
                }`}
                onDoubleClick={() => {
                  todoOrDone(task.status, task.task);
                }}
              >
                {task.task}
              </span>
              <div className="flex flex-col mx-1">
                <div
                  className={`${uTriangle} ${hoveruTriangle} mb-[1px] tooltip tooltip-top`}
                  data-task={task.task}
                  data-tip={task.rank + 1}
                  onClick={updateRank}
                ></div>
                <div
                  className={`${dTriangle} ${hoverdTriangle} mt-[1px] tooltip tooltip-bottom`}
                  data-task={task.task}
                  data-tip={task.rank - 1}
                  onClick={updateRank}
                ></div>
              </div>
              <button
                className="btn btn-sm"
                onClick={() => {
                  deleteTask(task.task);
                  setReload({});
                }}
              >
                Del
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
