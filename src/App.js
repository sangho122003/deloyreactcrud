
import './App.css';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Update from './Update';
function App() {
  return (
    <div className="App">
       <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} /> {/* Đảm bảo rằng đường dẫn đúng */}
      </Routes>
    </div>
     
    </div>
  );
}

export default App;
