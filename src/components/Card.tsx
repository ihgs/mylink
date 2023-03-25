import { ReactNode } from "react";

const Card = ({title, children}:{title: string, children: ReactNode}) =>{
  

  return (
    <div className="max-w-sm w-60 my-3 mr-3  rounded overflow-hidden bg-[#fca5a5] shadow-lg text-left px-5 py-4">
        <div className="text-2xl pb-3">{title}</div>
        <div>
          {children}
        </div>
      </div>
  )

}

export default Card;