import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthProvider from "./util/AuthAndWindowSizeProvider";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Yes from "./pages/Yes";


function App() {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/yes" element={<Yes />} />
          <Route path="/:category/:id" element={<Quiz/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
