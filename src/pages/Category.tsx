import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Title from "../components/Title";
import { listCategories, listLinks, updateCategories } from "../libs/linkStorage";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Array<string>>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    const linksData = listLinks();
    const tmp: Set<string> = new Set(listCategories());
    linksData.forEach((datum) => {
      tmp.add(datum.category);
    });
    setCategories(Array.from(tmp));
  }, []);

  const dragStart = (index: number) => {
    setDragIndex(index);
  };

  const dragEnter = (index: number) => {
    if (index === dragIndex) return;
    setCategories((prevState) => {
      const newCategories = JSON.parse(JSON.stringify(prevState));
      const deleteElement = newCategories.splice(dragIndex, 1)[0];
      newCategories.splice(index, 0, deleteElement);
      return newCategories;
    });
    setDragIndex(index);
  };

  const [modal, setModal] = useState<boolean>(false);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [deleteTarget, setDeleteTarget] = useState<string>("");

  const showMenu = (event: MouseEvent<HTMLElement>, category: string) => {
    event.preventDefault();
    console.log(event.clientX);
    // setX(Math.round(event.clientX));
    // setY(Math.round(event.clientY));
    setDeleteTarget(category);
    setModal(true);
  };

  const deleteCategory = () => {
    const newCategories = categories.filter((c) => {
      return c != deleteTarget;
    });
    setCategories(newCategories);
    updateCategories(newCategories);
    setModal(false);
  };

  const dragEnd = () => {
    updateCategories(categories);
    setDragIndex(null);
  };
  return (
    <div>
      <Title title="Manage Category Order" />
      <ul className="list-none">
        {categories.map((category, index) => {
          return (
            <li
              draggable={true}
              key={category}
              onDragStart={() => dragStart(index)}
              onDragEnter={() => dragEnter(index)}
              onDragOver={(event) => event.preventDefault()}
              onDragEnd={dragEnd}
              onContextMenu={(event) => {
                showMenu(event, category);
              }}
              className={index === dragIndex ? "bg-gray-100" : ""}
            >
              <div>{category !== "" ? category : "No category"}</div>
            </li>
          );
        })}
      </ul>

      <div>
        <input
          type="checkbox"
          id="menu-modal"
          checked={modal}
          readOnly
          className="modal-toggle"
        />
        <div className="modal fixed" style={{ top: `${y}px`, left: `${x}px` }}>
          <div className="modal-box">
            <label
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <button className="btn" onClick={deleteCategory}>
                Delete 「{deleteTarget}」 ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
