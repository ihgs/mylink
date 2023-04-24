import fileDownload from "js-file-download";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { addTask, clearMemo, deleteTask, listTasks, loadMemo, saveMemo } from "./libs/storage";

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

  useEffect(()=>{
    const ts = listTasks();
    ts.sort((a:any,b:any)=>{
      return a.rank - b.rank;
    })
    setTasks(ts)
  },[reload])

  const addNewTask = () => {
    
    addTask(newTask, newRank);
    setReload({})
  }

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
          <form className="form my-1">
            <div className="input-group">
              <input type="text" className="input input-bordered focus:outline-none input-sm" placeholder="task" onChange={(e)=>{setNewTask(e.target.value)}}></input>
              <input type="number" max="9" className="input input-bordered focus:outline-none w-14 input-sm" placeholder="rank" value={newRank} onChange={(e)=>{setNewRank(e.target.valueAsNumber)}}></input>
              <button type="button" className="btn btn-sm" onClick={addNewTask} >Save</button>
            </div>
            
          </form>
        </div>
        <div className="text-left pl-2 pt-4">
          {
            tasks.map(task=>{
              return (
                <div key={task.task} className="flex w-full p-1">
                  <span className="mr-auto">
                    {task.task}
                  </span>
                  <button className="btn btn-sm" onClick={()=>{deleteTask(task.task);setReload({})}}>Del</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Memo;
