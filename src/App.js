import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker stil dosyası
import HomePage from './pages/HomePage';
import Error404 from './pages/Error404';
import MyComponent from './components/MyComponent';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
          <Route path="/my-component" element={<MyComponent />} />
         
          <Route path="*" element={<Error404 />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/my-component" element={<MyComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
