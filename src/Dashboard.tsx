import { useEffect, useState } from "react";
import Card from "./components/Card";
import Tag from "./components/Tag";
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
      <Card title={category}>
      <ul className="list-disc list-inside">
        {linksData.map(datum=>{
          return (
            <li key={datum.id}>
              <a href={datum.link} target="_blank" className="link text-xl" onClick={()=>{clickLink(datum.id)}}>{datum.title}</a>
              { datum.tags &&
                datum.tags.map(tag=>{
                  return <Tag value={tag} />
                })
              }
            </li>
          )
        })}
        </ul>
      </Card>
  )}

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