import "./App.scss";
import Watch from "./component/pages/watch/Watch";
import Home from "./component/pages/home/Home";
import Register from "./component/pages/register/Register";
import Login from "./component/pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//react-router-dom link to other component
const App = () => {

  const user = true;// for login and register pages

  return (
    <Router>
      <Switch>
          <Route exact path="/"> 
            {user? <Home/> : <Redirect to="/register"/>} 
            {/* if there iss a user, then we go to th ehome page, if no user, go to the register page */}
          </Route>

          <Route path="/register">
            {!user? <Register/> : <Redirect to="/"/>}
          </Route>

          <Route path="/login">
            {!user? <Login/> : <Redirect to="/"/>}
          </Route>

        {user && (
          <>
          <Route path="/movies">
            <Home type="movies"/>
          </Route>

        <Route path="/series">
          <Home type="series"/>
        </Route>

        <Route path="/watch">
          <Watch/>
        </Route>
        </>
        )

        }
          
        </Switch>
    </Router>
  );

            
        
};

export default App;