  // import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import NavBar from './Components/NavBar';
// import News   from './ComponentsNews';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router, Routes,Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News';
// import { render } from '@testing-library/react';


const App = () => {
  // pageSize = 5;
  // apiKey = process.env.REACT_APPNews setProgress = {setProgress}_API
  // const [articles,setArticles] = useState([])
  const [progress,setProgress] = useState(0)
  // setProgress=(progress)=>{
  //   setState({progress:progress})
  // }
  const [Mode, setMode] = useState('light'); //Whether dark mode enable or not 
  const [alert, setAlert] = useState('null');

  const showAlert = (message, type) => {
    setAlert({
      mesg: message,
      type: type
    });
    setTimeout(() => {
    }, 3000);
  };
  const toggleMode = () => {
    if (Mode === "light") {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode has been Enabled", "Sucess");
      document.title = "TextUtils - Dark Mode";
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been Enabled", "Success");
      document.title = "TextUtils - Light Mode";
    }
  };

  
    return (
      <div>
         <Router>
         <NavBar  title="NewsMonkey" Mode={Mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
       <LoadingBar
       height={3}
        color='#f11946'
        progress={progress}
      />
       
       <Routes>
          <Route exact path="/"element={ <News setProgress = {setProgress} key ="general"pageSize ={5} country = "in" category = "general" />}> </Route>
          <Route exact path="/health"element={ <News setProgress = {setProgress} key ="health"pageSize ={5} country = "in" category = "health" />}> </Route>
          <Route exact path="/general"element={ <News setProgress = {setProgress} key = "general" pageSize ={5} country = "in" category = "general" />}> </Route>
          <Route exact path="/business"element={ <News setProgress = {setProgress} key = "business" pageSize ={5} country = "in" category = "business" />}> </Route>
          <Route exact path="/entertainment"element={ <News setProgress = {setProgress}  key = "entertainment" pageSize ={5} country = "in" category = "entertainment" />}> </Route>
          <Route exact path="/science"element={ <News setProgress = {setProgress} key = "science" pageSize ={5} country = "in" category = "science" />}> </Route>
          <Route exact path="/sports"element={ <News setProgress = {setProgress} key = "sports" pageSize ={5} country = "in" category = "sports" />}> </Route>
          <Route exact path="/technology"element={ <News setProgress = {setProgress} key = "technology" pageSize = {5} country = "in" category = "technology" />}> </Route>
          
        </Routes>
       </Router>
      </div>
    )
  
}
export default App