import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
const App = () => {
    return <div>
        <Router>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
            </Routes>
        </Router>
    </div>
};

export default App;

const Root = () => {
    //Check if token exist in local storage
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}
