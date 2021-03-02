import React from "react";
import User from "./view/user/User";
import Login from "./view/login/Login";
import Home from "./view/home/Home";
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App (){

  return (
      <Router>
        <div className="menu">
           <h1 style={{textAlign: "center", fontWeight: "700", color: "#fff"}}> TODOLIST REACT </h1>
        </div>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={User}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
  )
}

export default App