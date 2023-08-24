import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={NavBar}>
        <Route path="/auth/login" element={LoginPage}/>
        <Route path="/auth/register" element={RegisterPage}/>
      </Route>
    </Routes>
  );
}

export default App;
