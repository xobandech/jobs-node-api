import { Routes, Route } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./contexts/UserContext";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
