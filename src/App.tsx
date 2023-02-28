import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Home from './Home';

const app_path = process.env.dev || "/mylink"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`${app_path}/`} element={<Home />} />
        <Route path={`${app_path}/test`}  element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App;
