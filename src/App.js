import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

import Build from "./Build"
import SignIn from "./SignIn.js"
import Orders from "./Orders.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="orders" element={<Orders/>} />
          <Route exact path="build" element={<Build />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;