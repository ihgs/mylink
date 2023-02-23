import { useEffect, useState } from "react";
import { countUp, LinkData, listLinks, updateLink } from "../libs/storage";

interface SearchParam {
  title: string;
  category: string;
}

interface LinkRowProps {
  link: LinkData;
  filterdLinks: any;
}

function LinkRow({ link, filterdLinks }: LinkRowProps) {
  const [mode, setMode] = useState<string>("show");
  const [newInput, setNewInput] = useState<LinkData>({ ...link });

  const clickLink = (id: string | undefined | null) => {
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

  const clickEdit = () => {
    setMode("edit");
  };
  return (
    <tr>
      <td>
        {mode === "show" ? (
          <a
            href={link.link}
            onClick={() => clickLink(link.id)}
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
      <td>{link.count}</td>
      <td>{new Date(link.createdAt!).toDateString()}</td>
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
        <button className="btn btn-sm btn-warning m-1">Delete</button>
      </td>
    </tr>
  );
}

export default function LinkList() {
  const [links, setLinks] = useState<Array<LinkData>>([]);
  const [search, setSearch] = useState<SearchParam>({
    title: "",
    category: "",
  });

  useEffect(() => {
    filtedLinks();
  }, [search]);

  const changeSearchInput = (target: keyof SearchParam, value: string) => {
    const newone = { ...search };
    newone[target] = value;
    setSearch(newone);
  };

  const filtedLinks = () => {
    let items = listLinks();
    if (search.title || search.category) {
      items = items.filter((item) => {
        if (search.title) {
          if (!item.title.includes(search.title)) {
            return false;
          }
        }
        if (search.category) {
          if (!item.category.includes(search.category)) {
            return false;
          }
        }
        return true;
      });
    }
    setLinks(items);
  };

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>title</th>
            <th>category</th>
            <th>count</th>
            <th>createdAt</th>
            <th>action</th>
          </tr>
          <tr>
            <th>
              <input
                className="input input-bordered"
                onChange={(e) => changeSearchInput("title", e.target.value)}
              />
            </th>
            <th>
              <input
                className="input input-bordered"
                onChange={(e) => changeSearchInput("category", e.target.value)}
              />
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            return (
              <LinkRow key={link.id} link={link} filterdLinks={filtedLinks} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
