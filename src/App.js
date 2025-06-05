import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = ()=>{
  
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={ <News setProgress={setProgress} key="general" pageSize={pageSize} country='us' category="general" apiKey={apiKey} /> } />
            <Route exact path='/business' element={ <News setProgress={setProgress} key="business" pageSize={pageSize} country='us' category='business' apiKey={apiKey} /> } />
            <Route exact path='/entertainment' element={ <News setProgress={setProgress} key="entertainment" pageSize={pageSize} country='us' category='entertainment' apiKey={apiKey} /> } />
            <Route exact path='/general' element={ <News setProgress={setProgress} key="general" pageSize={pageSize} country='us' category='general' apiKey={apiKey} /> } />
            <Route exact path='/health' element={ <News setProgress={setProgress} key="health" pageSize={pageSize} country='us' category='health' apiKey={apiKey} /> } />
            <Route exact path='/science' element={ <News setProgress={setProgress} key="science" pageSize={pageSize} country='us' category='science' apiKey={apiKey} /> } />
            <Route exact path='/sports' element={ <News setProgress={setProgress} key="sports" pageSize={pageSize} country='us' category='sports' apiKey={apiKey} /> } />
            <Route exact path='/technology' element={ <News setProgress={setProgress} key="technology" pageSize={pageSize} country='us' category='technology' apiKey={apiKey} /> } />
          </Routes>
        </Router>
      </div>
    )
}

export default App;
