import React, { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';
import { addLink, countUp, LinkData, listLinks } from './libs/storage';

interface SearchParam {
  title: string
  category: string
}

function App() {
  const [links, setLinks] = useState<Array<LinkData>>([])
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [search, setSearch] = useState<SearchParam>({ title: "", category: "" })

  useEffect(() => {
    filtedLinks()
  }, [search])

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLink({ category, title, link })
    setCategory('')
    setTitle('')
    setLink('')
    filtedLinks()
  }

  const clickLink = (id: string | undefined | null) => {
    if (id) {
      countUp(id)
      filtedLinks()
    }
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

  const formView = () => {
    return (
      <div className="grid grid-cols-1">
        <form onSubmit={saveLink}>
          <div>
            <input type="text" name="title" value={title} onChange={handleTitle}
              className="input input-bordered w-full my-1" placeholder='Title'></input>

          </div>
          <div>
            <input type="url" name="link" value={link} onChange={handleLink}
              className="input input-bordered w-full my-1" placeholder='Link'></input>

          </div>
          <div>
            <input type="text" name="category" value={category} onChange={handleCategory}
              className="input input-bordered w-full my-1" placeholder='category'></input>

          </div>
          <div>
            <input type="submit" value="Save" className="btn" />

          </div>
        </form>
      </div>
    )
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
  const changeSearchInput = (target: keyof SearchParam, value: string) => {
    const newone = { ...search }
    newone[target] = value
    setSearch(newone)
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'link';
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setLink(e.dataTransfer?.getData('text')!)
  }

  const LinkView = () => {
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



  return (
    <div className="App w-5/6 mx-auto" onDrop={onDrop} onDragOver={onDragOver}>
      <h1 className="text-3xl font-bold underline m-10">
        Manage Link
      </h1>

      {LinkView()}

      {formView()}


    </div>
  );
}

export default App;
