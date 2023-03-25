import { ChangeEvent, FormEvent, useState, DragEvent } from "react"
import { addLink } from "../libs/storage"
import Input from "./Input"

const NewLink = ({postSave}: {postSave: any}) => {
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [tags, setTags] = useState<string>("")

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
      <div className="grid grid-cols-1w" onDrop={onDrop} onDragOver={onDragOver}>
        <form onSubmit={saveLink}>
          <Input name="title" value={title} setValue={setTitle} required placeholder="Ttile"></Input>
          <Input name="link" type="url" value={link} setValue={setLink} required placeholder="Link"></Input>
          <Input name="category"  value={category} setValue={setCategory}  placeholder="category"></Input>
          <Input name="tags"  value={tags} setValue={setTags}  placeholder="tag"></Input>
          
            <input type="submit" value="Save" className="btn" />

          
        </form>
      </div>
    )
}

export default NewLink;