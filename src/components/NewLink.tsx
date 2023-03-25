import { ChangeEvent, FormEvent, useState, DragEvent } from "react"
import { addLink } from "../libs/storage"

const NewLink = ({postSave}: {postSave: any}) => {
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [tags, setTags] = useState<string>("")

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

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if(e.dataTransfer) e.dataTransfer.dropEffect = 'link';
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setLink(e.dataTransfer?.getData('text')!)
  }
  
  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLink({ category, title, link, tags: tags.split(" ")})
    setCategory('')
    setTitle('')
    setLink('')
    setTags('')
    postSave()
  }


  return (
      <div className="grid grid-cols-1" onDrop={onDrop} onDragOver={onDragOver}>
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

export default NewLink;