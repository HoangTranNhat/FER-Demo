import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/users" element={<UsersPage />}/>
          <Route path="/users/:id" element={<UserDetails />}/>
          <Route path="/create-user" element={<CreateUser />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
