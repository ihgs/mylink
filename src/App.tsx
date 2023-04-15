import { DragEvent, ReactNode, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryManager from "./Category";
import Header, { Menu } from "./components/Header";
import NewLink from "./components/NewLink";
import Dashboard from "./Dashboard";
import DataManager from "./DataManager";
import LinkManager from "./LinkManager";
import Memo from "./Memo";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>();
  const menus: Array<Menu> = [
    { link: `/`, title: "Home" },
    { link: `/linkmanager`, title: "Manage Link" },
    { link: `/categories`, title: "Category" },
    { link: `/data`, title: "Data" },
    { link: `/memo`, title: "Memo" },
  ];

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "link";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setModal(true);
    setLink(e.dataTransfer?.getData("text")!);
  };

  const DragDrop = ({ children }: { children: ReactNode }) => {
    return (
      <div onDrop={onDrop} onDragOver={onDragOver}>
        {children}
      </div>
    );
  };

  return (
    <div>
      <Header menus={menus}>
        <label
          onClick={() => {
            setModal(true);
          }}
          className="btn btn-ghost"
        >
          New
        </label>
      </Header>
      <div className="App w-5/6 mx-auto">
        <Routes>
          <Route
            path={`/linkmanager`}
            element={
              <DragDrop>
                <LinkManager />
              </DragDrop>
            }
          />
          <Route
            path={`/`}
            element={
              <DragDrop>
                <Dashboard />
              </DragDrop>
            }
          />

          <Route path={`/categories`} element={<CategoryManager />} />
          <Route
            path={`/data`}
            element={
              <DragDrop>
                <DataManager />
              </DragDrop>
            }
          />
          <Route path={`/memo`} element={<Memo />} />
        </Routes>
        <input
          type="checkbox"
          id="my-modal"
          checked={modal}
          readOnly
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <label
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <NewLink
              linkParam={link}
              postSave={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
