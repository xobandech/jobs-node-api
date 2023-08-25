import { Routes, Route } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/auth/login" element={<LoginPage />}/>
        <Route path="/auth/register" element={<RegisterPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
