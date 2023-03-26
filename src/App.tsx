import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryManager from './Category';
import Header, { Menu } from './components/Header';
import Dashboard from './Dashboard';
import Home from './Home';

const app_path = process.env.dev || "/mylink"

function App() {
  const menus: Array<Menu> = [
    {link: `${app_path}/`, title: "Home"},
    {link: `${app_path}/dashboard`, title: "Dashboard"},
    {link: `${app_path}/categories`, title: "Category"},
  ] 

  return (
    <div>
      <Header menus={menus} />
    <div className="App w-5/6 mx-auto">
      <Routes>
        <Route path={`${app_path}/`} element={<Home />} />
        <Route path={`${app_path}/dashboard`}  element={<Dashboard />} />
        <Route path={`${app_path}/categories`}  element={<CategoryManager />} />
      </Routes>
    </div>
    </div>

  )
}

export default App;
