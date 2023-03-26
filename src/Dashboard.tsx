import { useEffect, useState } from "react";
import Card from "./components/Card";
import Tag from "./components/Tag";
import Title from "./components/Title";
import { countUp, LinkData, listCategories, listLinks } from "./libs/storage";




function Dashboard () {

  const [links, setLinks] = useState< {[key: string]: Array<LinkData>}>({});
  const [categories, setCategories] = useState<Array<string>>([])

  useEffect(()=>{
    const linksData = listLinks()
    const linkMap: {[key: string]: Array<LinkData>} = {}
    const tmp: Set<string> = new Set(listCategories())
    linksData.forEach(datum=>{
      if(!(datum.category in linkMap)){
        linkMap[datum.category] = []
        tmp.add(datum.category)
      }
      linkMap[datum.category].push(datum)
    })
    setCategories(Array.from(tmp))
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
      <Card key={category} title={category}>
      <ul className="list-disc list-inside">
        {linksData.map(datum=>{
          return (
            <li key={datum.id} className="break-all my-1">
              <a href={datum.link} target="_blank" className="link text-xl" onClick={()=>{clickLink(datum.id)}}>{datum.title}</a>
              { datum.tags &&
                datum.tags.map(tag=>{
                  return <Tag key={tag} value={tag} className="ml-2"/>
                })
              }
            </li>
          )
        })}
        </ul>
      </Card>
  )}

  return (
    <div>
      <Title title="Dashboard" />
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