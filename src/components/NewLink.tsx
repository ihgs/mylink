import { FormEvent, useState, useEffect } from "react";
import { addLink } from "../libs/storage";
import Input from "./Input";

const NewLink = ({
  linkParam,
  postSave,
}: {
  linkParam: string | undefined;
  postSave: any;
}) => {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (linkParam) setLink(linkParam);
  }, [linkParam]);

  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLink({ category, title, link, tags: tags.split(" ") });
    setCategory("");
    setTitle("");
    setLink("");
    setTags("");
    postSave();
  };

  return (
    <div className="grid grid-cols-1w">
      <form onSubmit={saveLink}>
        <Input
          name="title"
          value={title}
          setValue={setTitle}
          required
          placeholder="Ttile"
          className="w-full my-1"
        ></Input>
        <Input
          name="link"
          type="url"
          value={link}
          setValue={setLink}
          required
          placeholder="Link"
          className="w-full my-1"
        ></Input>
        <Input
          name="category"
          value={category}
          setValue={setCategory}
          placeholder="category"
          className="w-full my-1"
        ></Input>
        <Input
          name="tags"
          value={tags}
          setValue={setTags}
          placeholder="tag"
          className="w-full my-1"
        ></Input>

        <input type="submit" value="Save" className="btn" />
      </form>
    </div>
  );
};

export default NewLink;
