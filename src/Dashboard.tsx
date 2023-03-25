import { useEffect, useState } from "react";
import { countUp, LinkData, listLinks } from "./libs/storage";




function Dashboard () {

  const [links, setLinks] = useState< {[key: string]: Array<LinkData>}>({});
  const [categories, setCategories] = useState<Array<string>>([])

  useEffect(()=>{
    const linksData = listLinks()
    const linkMap: {[key: string]: Array<LinkData>} = {}
    const tmp: Array<string> = []
    linksData.forEach(datum=>{
      if(!(datum.category in linkMap)){
        linkMap[datum.category] = []
        tmp.push(datum.category)
      }
      linkMap[datum.category].push(datum)
    })
    setCategories(tmp)
    setLinks(linkMap)
  },[])


  const CategoryCard = (category: string, linksData: Array<LinkData> ) =>{
    const clickLink = (id: string | undefined | null) => {
      if (id) {
        countUp(id);
      }
    };

    if(category == ""){
      category = "No category"
    }
    return (
      <div className="max-w-sm w-60 my-3 mr-3  rounded overflow-hidden bg-[#fca5a5] shadow-lg text-left px-5 py-4">
        <div className="text-2xl pb-3">{category}</div>
        <ul className="list-disc px-5">
        {linksData.map(datum=>{
          return (
            <li key={datum.id}>
              <a href={datum.link} target="_blank" className="link text-xl" onClick={()=>{clickLink(datum.id)}}>{datum.title}</a>
              { datum.tags &&
                datum.tags.map(tag=>{
                  return tag && <span className="inline-block bg-gray-200 rounded-full mx-2 px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">{tag}</span>

                })
              }
    
            </li>
          )
        })}
        </ul>
      </div>
    )
  }

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold underline m-10">
        Dashboard
      </h1>
      <div className="flex flex-wrap">
      {
        categories.map(category=>{
          return CategoryCard(category, links[category])
        })
      }
      </div>
    </div>
  )
}

export default Dashboard;