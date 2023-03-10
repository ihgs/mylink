import React, { ChangeEvent, DragEvent, FormEvent, useState } from 'react';

import LinkList from './components/LinkList';
import { addLink } from './libs/storage';



function Home() {
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [reload, setReload] = useState<any>({})

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value)
  }

  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLink({ category, title, link, tags: tags.split(" ")})
    setCategory('')
    setTitle('')
    setLink('')
    setTags('')
    setReload({})
  }


  const formView = () => {
    return (
      <div className="grid grid-cols-1">
        <form onSubmit={saveLink}>
          <div>
            <input type="text" name="title" value={title} onChange={handleTitle}
              className="input input-bordered w-full my-1" placeholder='Title' required></input>

          </div>
          <div>
            <input type="url" name="link" value={link} onChange={handleLink}
              className="input input-bordered w-full my-1" placeholder='Link' required></input>

          </div>
          <div>
            <input type="text" name="category" value={category} onChange={handleCategory}
              className="input input-bordered w-full my-1" placeholder='category'></input>

          </div>
          <div>
            <input type="text" name="tags" value={tags} onChange={handleTags}
              className="input input-bordered w-full my-1" placeholder='tag'></input>
          </div>
          <div>
            <input type="submit" value="Save" className="btn" />

          </div>
        </form>
      </div>
    )
  }




  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'link';
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setLink(e.dataTransfer?.getData('text')!)
  }


  return (
    <div className="App w-5/6 mx-auto" onDrop={onDrop} onDragOver={onDragOver}>
      <h1 className="text-3xl font-bold underline m-10">
        Manage Link
      </h1>

      <LinkList realod={reload} />

      {formView()}


    </div>
  );
}

export default Home;
