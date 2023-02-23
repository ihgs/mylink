import { useEffect, useState } from "react"
import { countUp, LinkData, listLinks } from "../libs/storage"


interface SearchParam {
  title: string
  category: string
}

export default function LinkList() {

  const [links, setLinks] = useState<Array<LinkData>>([])
  const [search, setSearch] = useState<SearchParam>({ title: "", category: "" })


  useEffect(() => {
    filtedLinks()
  }, [search])


  const clickLink = (id: string | undefined | null) => {
    if (id) {
      countUp(id)
      filtedLinks()
    }
  }

  const changeSearchInput = (target: keyof SearchParam, value: string) => {
    const newone = { ...search }
    newone[target] = value
    setSearch(newone)
  }

  const filtedLinks = () => {
    let items = listLinks()
    if (search.title || search.category) {
      items = items.filter(item => {
        if (search.title) {
          if (!item.title.includes(search.title)) {
            return false
          }
        }
        if (search.category) {
          if (!item.category.includes(search.category)) {
            return false
          }
        }
        return true
      })
    }
    setLinks(items)
  }

  const linkRow = (link: LinkData) => {
    return (
      <tr key={link.id}>
        <td><a href={link.link} onClick={() => clickLink(link.id)} target="_blank" rel="noreferrer noopener" className="link">{link.title}</a></td>
        <td>{link.category}</td>
        <td>{link.count}</td>
        <td>{new Date(link.createdAt!).toDateString()}</td>
      </tr>
    )
  }

  return (
    <div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>count</th>
            <th>createdAt</th>
          </tr>
          <tr>
            <th>
              <input className="input input-bordered" onChange={(e) => changeSearchInput('title', e.target.value)} /></th>
            <th>
              <input className="input input-bordered" onChange={(e) => changeSearchInput('category', e.target.value)} /></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            return linkRow(link)
          }
          )}
        </tbody>
      </table>
    </div>

  )
}