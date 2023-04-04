import { useEffect, useState } from "react"
import Title from "./components/Title";
import { listCategories, listLinks, updateCategories } from "./libs/storage";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Array<string>>([])
  const [dragIndex, setDragIndex] = useState<number|null>(null);

  useEffect(()=>{
    const linksData = listLinks();
    const tmp: Set<string> = new Set(listCategories())
    linksData.forEach(datum=>{
      tmp.add(datum.category)
    })
    setCategories(Array.from(tmp))  
  },[])

  const dragStart = (index:number)=>{
    setDragIndex(index)
  }

  const dragEnter = (index:number) => {
    if (index === dragIndex) return;
    setCategories((prevState)=>{
      const newCategories = JSON.parse(JSON.stringify(prevState))
      const deleteElement = newCategories.splice(dragIndex, 1)[0]
      newCategories.splice(index, 0, deleteElement)
      return newCategories
    })
    setDragIndex(index)
  };

  const dragEnd = () => {
    updateCategories(categories)
    setDragIndex(null)
  };
  return (
    <div>
      <Title title="Manage Category Order" />
      <ul className="list-none">

      {categories.map((category,index)=>{
        return (
          <li draggable={true} key={category} 
            onDragStart={() => dragStart(index)} 
            onDragEnter={() => dragEnter(index)} 
            onDragOver={(event) => event.preventDefault()} 
            onDragEnd={dragEnd}
            className={index === dragIndex ? 'bg-gray-100' : ''}
            >
            <div>{category !== "" ? category : "No category"}</div>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default CategoryManager