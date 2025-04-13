import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';

const App = () => {
    const { token } = useContext<any>(UserContext);
    console.log('token', token);
    if (!token) {
        return <div>loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {token && <Route path="/dashboard" element={<Home />} />}
                {token && <Route path="/income" element={<Income />} />}
                {token && <Route path="/expense" element={<Expense />} />}
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;

const Root = () => {
    //Check if token exist in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
};
