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
import ProtectedRoute from './Auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/404/404';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/income"
                        element={
                            <ProtectedRoute>
                                <Income />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/expense"
                        element={
                            <ProtectedRoute>
                                <Expense />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Toaster
                position="top-right"
                toastOptions={{ className: '', style: { fontSize: '13px' } }}
            />
        </>
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
