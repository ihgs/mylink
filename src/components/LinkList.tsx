import { useEffect, useState } from "react";
import { countUp, deleteLink, LinkData, updateLink } from "../libs/linkStorage";
import useLinks from "../libs/useLinks";
import Input from "./Input";
import Tag from "./Tag";

interface SearchParam {
  title: string;
  category: string;
}

export type FilterdLinks = () => void;
export type SortLinks = (order: "asc" | "des") => void;

interface LinkRowProps {
  link: LinkData;
  filterdLinks: FilterdLinks;
}

const toDateString = (link: LinkData) => {
  if (link.createdAt) {
    return new Date(link.createdAt).toDateString();
  }
  return "";
};

function LinkRow({ link, filterdLinks }: LinkRowProps) {
  const [mode, setMode] = useState<string>("show");
  const [newInput, setNewInput] = useState<LinkData>({ ...link });

  const clickLink = () => {
    const id = link.id;
    if (id) {
      countUp(id);
      filterdLinks();
    }
  };

  const clickUpdate = () => {
    updateLink(newInput);
    filterdLinks();
    setMode("show");
  };

  const clickDelete = () => {
    const id = link.id;
    if (id) {
      deleteLink(id);
      filterdLinks();
    }
  };
  const clickEdit = () => {
    setMode("edit");
  };
  return (
    <tr>
      <td>
        {mode === "show" ? (
          <a
            href={link.link}
            onClick={clickLink}
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            {link.title}
          </a>
        ) : (
          <input
            type="text"
            className="input input-bordered"
            value={newInput.title}
            onChange={(e) => {
              setNewInput({ ...newInput, title: e.target.value });
            }}
          />
        )}
      </td>
      <td>
        {mode === "show" ? (
          link.category
        ) : (
          <input
            type="text"
            className="input input-bordered"
            value={newInput.category}
            onChange={(e) => {
              setNewInput({ ...newInput, category: e.target.value });
            }}
          />
        )}
      </td>
      <td>
        {link.tags &&
          link.tags.map((tag, index) => {
            return <Tag key={index} value={tag} className="mr-2"></Tag>;
          })}
      </td>
      <td>{link.count}</td>
      <td>{toDateString(link)}</td>
      <td>
        {mode === "show" ? (
          <button className="btn btn-sm m-1" onClick={clickEdit}>
            Edit
          </button>
        ) : (
          <button
            className="btn btn-sm m-1"
            onClick={() => {
              clickUpdate();
            }}
          >
            Update
          </button>
        )}
        <button className="btn btn-sm btn-warning m-1" onClick={clickDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function LinkList() {
  const [search, setSearch] = useState<SearchParam>({
    title: "",
    category: "",
  });
  const [links, filter, sort] = useLinks(search);

  useEffect(() => {
    if (!Array.isArray(filter)) filter();
  }, [search]);

  const changeSearchInput = (target: keyof SearchParam, value: string) => {
    const newone = { ...search };
    newone[target] = value;
    setSearch(newone);
  };

  const ascLink = () => {
    sort("asc");
  };
  const desLink = () => {
    sort("des");
  };

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>tags</th>
            <th>count</th>
            <th>createdAt</th>
            <th>action</th>
          </tr>
          <tr>
            <th>
              <Input
                name="search_title"
                setValue={(value: string) => changeSearchInput("title", value)}
                placeholder=""
                value={search.title}
              />
            </th>
            <th>
              <Input
                name="search_category"
                setValue={(value: string) =>
                  changeSearchInput("category", value)
                }
                placeholder=""
                value={search.category}
              />
            </th>
            <th></th>
            <th>
              <a className="link p-1" onClick={desLink}>
                ↓
              </a>
              <a className="link p-1" onClick={ascLink}>
                ↑
              </a>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(links) &&
            links.map((link: LinkData) => {
              return (
                <LinkRow key={link.id} link={link} filterdLinks={filter} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
