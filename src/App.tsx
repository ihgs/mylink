import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryManager from './Category';
import Header, { Menu } from './components/Header';
import Dashboard from './Dashboard';
import LinkManager from './LinkManager';


function App() {
  const menus: Array<Menu> = [
    {link: `/`, title: "Home"},
    {link: `/linkmanager`, title: "Manage Link"},
    {link: `/categories`, title: "Category"},
  ] 

  return (
    <div>
      <Header menus={menus} />
    <div className="App w-5/6 mx-auto">
      <Routes>
        <Route path={`/linkmanager`} element={<LinkManager />} />
        <Route path={`/`}  element={<Dashboard />} />
        <Route path={`/categories`}  element={<CategoryManager />} />
      </Routes>
    </div>
    </div>

  )
}

export default App;
