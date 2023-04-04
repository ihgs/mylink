import { decodeData, loadData } from "./libs/storage"

const DataManager = ()=>{


  return (
    <>
      <div className="w-128 break-all">
        {loadData()}
      </div>  
    </>
    
  )
}
export default DataManager