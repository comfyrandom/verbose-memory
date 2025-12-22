import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.tsx';
import Layout from './components/Layout.tsx';
import Users from "./Pages/Users.tsx";
import Analytics from "./Pages/Analytics.tsx";
import Settings from "./Pages/Settings.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import LoginPage from "./Pages/LoginPage.tsx";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Layout>
        </Router>
        </AuthProvider>
    );
}

export default App;