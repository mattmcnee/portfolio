import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '/src/pages/Home';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
