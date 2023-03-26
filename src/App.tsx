import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryManager from './Category';
import Dashboard from './Dashboard';
import Home from './Home';

const app_path = process.env.dev || "/mylink"

function App() {
  return (
    <div className="App w-5/6 mx-auto">
      <Routes>
        <Route path={`${app_path}/`} element={<Home />} />
        <Route path={`${app_path}/dashboard`}  element={<Dashboard />} />
        <Route path={`${app_path}/categories`}  element={<CategoryManager />} />
      </Routes>
    </div>
  )
}

export default App;
