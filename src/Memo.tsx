import { ChangeEvent, useEffect, useState } from "react"
import { clearMemo, loadMemo, saveMemo } from "./libs/storage";


const timeout = 5000
const Memo = () => {

  const [memo, setMemo] = useState(loadMemo());
  const [action, setAction] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      if(memo){
        saveMemo(memo)
        setAction("Saved")
        setTimeout(()=>{
          setAction("")
        },1500)  
      }else {
        clearMemo()
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

  return (
    <div>
      <div className="flex mt-2 ml-4 h-6 ">
        <div className="flex text-slate-600">
          {action}
        </div>
      </div>
      <textarea className="textarea textarea-bordered w-full my-1 h-[calc(100vh-74px)]" onChange={changeHandler} value={memo}>
      </textarea>
    </div>
  )

}

export default Memo