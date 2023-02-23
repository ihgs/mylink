import React, { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';
import { addLink, countUp, LinkData, listLinks } from './libs/storage';

function App() {
  const [links, setLinks] = useState<Array<LinkData>>([])
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")

  useEffect(()=>{
    const items = listLinks()
    setLinks(items)
  },[])

  const handleCategory = (e:ChangeEvent<HTMLInputElement>)=>{
    setCategory(e.target.value)
  }
    const handleTitle = (e:ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value)
  }
  const handleLink = (e:ChangeEvent<HTMLInputElement>)=>{
    setLink(e.target.value)
  }

  const saveLink = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    addLink({category, title, link})
    setLinks(listLinks())
  }

  const clickLink = (id: string|undefined|null)=>{
    if(id){
      countUp(id)
    }
  }

  const linkRow = (link: LinkData) => {
    return(
      <tr key={link.id}>
        <td><a href={link.link} onClick={()=>clickLink(link.id)} target="_blank" rel="noreferrer noopener" className="link">{link.title}</a></td>
        <td>{link.category}</td>
        <td>{link.count}</td>
      </tr>
    )
  }

  const onDragOver=(e:DragEvent)=>{
    e.preventDefault()
    e.dataTransfer.dropEffect = 'link';
  }

  const onDrop = (e:DragEvent)=>{
    e.preventDefault()
    setLink(e.dataTransfer?.getData('text')!)
  }

  const LinkView = () => {
    return (
      <table className="table w-full">
        <thead>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link)=>{
            return linkRow(link)}
          )}
        </tbody>
      </table>
    )
  }



  return (
    <div className="App w-5/6 mx-auto" onDrop={onDrop} onDragOver={onDragOver}>
      <h1 className="text-3xl font-bold underline">
        Manage Link
      </h1>
      <div className="grid grid-cols-12">
  
      
        <div className="col-spane-8">
          <form onSubmit={saveLink}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-12 sm:col-span-12">
              <input type="text" name="title" value={title} onChange={handleTitle} 
              className="input input-bordered" placeholder='Title'></input>
              <input type="url" name="link" value={link} onChange={handleLink}
              className="input input-bordered" placeholder='Link'></input>
              <input type="text" name="category" value={category} onChange={handleCategory} 
              className="input input-bordered" placeholder='category'></input>
              <input type="submit" value="Save" className="btn" />
            </div>
          </div>
          </form>
        </div>
      </div>

      {LinkView()}

      
    </div>
  );
}

export default App;
