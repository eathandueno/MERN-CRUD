import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUsers from "./components/create-user.component";
import EditExercises from "./components/edit-exercise.component";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">

        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<ExercisesList/>} />
          <Route path="/edit/:id" element={<EditExercises />} />
          <Route path="/create" element={<CreateExercises/>} />
          <Route path="/user" element={<CreateUsers/>} />

        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
