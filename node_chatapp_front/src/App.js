
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react'
import "./App.css";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

const App = () => {
  const [userName, setUserName] = useState('')

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home setUserName={setUserName} userName={userName} />} />
        <Route exact path="/chatroom" render={() => <ChatRoom userName={userName} />} />
      </Switch>
    </Router>
  );
}

export default App;