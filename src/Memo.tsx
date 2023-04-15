import fileDownload from "js-file-download";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { clearMemo, loadMemo, saveMemo } from "./libs/storage";


const timeout = 1000
const Memo = () => {
  const isFirst = useRef(true);

  const savedMemo = loadMemo()
  const [memo, setMemo] = useState(savedMemo.memo);
  const [version, setVersion] = useState(savedMemo.version);
  const [action, setAction] = useState<string>("");

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return
    }
    const timeoutId = setTimeout(()=>{
      if(memo){
        try{
          const newVersion = saveMemo({memo, version})
          setVersion(newVersion)
          setAction("Saved")
          setTimeout(()=>{
            setAction("")
          },1500)  
        }catch (e: any){
          setAction(e.toString())
          setTimeout(()=>{
            setAction("")
          },1500)
        }
      }else {
        clearMemo()
        setVersion(null)
        setAction("Clear")
        setTimeout(()=>{
          setAction("")
        },1500)  
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [memo]);
 
  const changeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const data = e.target.value
    setMemo(data)
  }
  const keyDownHandler = (e:KeyboardEvent<HTMLTextAreaElement>)=> {
    if (e.key === ';' && (e.ctrlKey)) {
      const pos = e.currentTarget.selectionStart
      const len = memo.length
      const before = memo.substring(0, pos);
      const today     = (new Date()).toLocaleDateString();
      const after    = memo.substring(pos, len);
      setMemo( before + today + after)
    }
  }

  const download = () => {
    const now = new Date()
    const fileName = `memo_${now.getFullYear()}${now.getMonth()+1}${now.getDate()}${now.getHours()}${now.getMinutes()}.txt`
    fileDownload(memo, fileName);
  };

  return (
    <div>
      <div className="flex mt-2 ml-4 h-6 ">
        <div className="flex text-slate-600">
          {action}
        </div>
        <div className="flex ml-auto">
          <label className="link link-hover" onClick={download}>Download</label>
        </div>
      </div>
      <textarea className="textarea textarea-bordered leading-5 w-full my-1 h-[calc(100vh-74px)]" 
        onChange={changeHandler} value={memo}
        onKeyDown={keyDownHandler}
        >
      </textarea>
    </div>
  )

}

export default Memo