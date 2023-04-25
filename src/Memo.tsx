import fileDownload from "js-file-download";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addTask,
  clearMemo,
  deleteTask,
  doneTask,
  listTasks,
  loadMemo,
  saveMemo,
  undoneTask,
  updateTask,
} from "./libs/storage";

const uTriangle = `w-0 h-0 border-l-[18px] border-l-transparent border-b-[14px]  border-r-[18px] border-r-transparent`;
const hoveruTriangle = `hover:w-0 h-0 hover:border-l-[18px] hover:border-l-transparent hover:border-b-[14px]  hover:border-r-[18px] hover:border-r-transparent hover:border-slate-700`;
const dTriangle =
  "w-0 h-0 border-l-[18px] border-l-transparent border-t-[14px]  border-r-[18px] border-r-transparent";
const hoverdTriangle =
  "hover:w-0 hover:h-0 hover:border-l-[18px] hover:border-l-transparent hover:border-t-[14px]  hover:border-r-[18px] hover:border-r-transparent hover:border-slate-700";
const timeout = 5000;
const Memo = () => {
  const isFirst = useRef(true);

  const savedMemo = loadMemo();
  const [memo, setMemo] = useState(savedMemo.memo);
  const [version, setVersion] = useState(savedMemo.version);
  const [action, setAction] = useState<string>("");
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newRank, setNewRank] = useState<number>(3);
  const [reload, setReload] = useState<any>();

  const showInstantMessage = (msg: string) => {
    setAction(msg);
    setTimeout(() => {
      setAction("");
    }, 1500);
  };
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (memo) {
        try {
          const newVersion = saveMemo({ memo, version });
          setVersion(newVersion);
          showInstantMessage("Saved");
        } catch (e: any) {
          showInstantMessage(e.toString());
        }
      } else {
        clearMemo();
        setVersion(null);
        showInstantMessage("Clear");
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [memo]);

  useEffect(() => {
    const ts = listTasks();
    ts.sort((a: any, b: any) => {
      return b.rank - a.rank;
    });
    setTasks(ts);
  }, [reload]);

  const addNewTask = (event: SyntheticEvent) => {
    event.preventDefault();

    addTask(newTask, newRank);
    setReload({});
  };

  const updateRank = (event: MouseEvent<HTMLDivElement>) => {
    const crank = event.currentTarget.dataset.tip || "0";
    const ctask = event.currentTarget.dataset.task;
    updateTask(ctask, parseInt(crank));
    setReload({});
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const data = e.target.value;
    setMemo(data);
  };
  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ";" && e.ctrlKey) {
      const pos = e.currentTarget.selectionStart;
      const len = memo.length;
      const before = memo.substring(0, pos);
      const today = new Date().toLocaleDateString();
      const after = memo.substring(pos, len);
      setMemo(before + today + after);
    }
  };

  const download = () => {
    const now = new Date();
    const fileName = `memo_${now.getFullYear()}${
      now.getMonth() + 1
    }${now.getDate()}${now.getHours()}${now.getMinutes()}.txt`;
    fileDownload(memo, fileName);
  };

  const todoOrDone = (status: string, task: string) => {
    if (status == "done") {
      undoneTask(task);
    } else {
      doneTask(task);
    }
    setReload({});
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div className="flex mt-2 ml-4 h-6 ">
          <div className="flex text-slate-600">{action}</div>
          <div className="flex ml-auto">
            <label className="link link-hover" onClick={download}>
              Download
            </label>
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered leading-5 w-full my-1 h-[calc(100vh-74px)]"
          onChange={changeHandler}
          value={memo}
          onKeyDown={keyDownHandler}
        ></textarea>
      </div>
      <div className="flex flex-col w-[32rem]  mt-2 ml-2">
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
                    task.status == "done" ? "line-through decoration-2" : ""
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
    </div>
  );
};

export default Memo;
