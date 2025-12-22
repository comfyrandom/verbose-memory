import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.tsx';
import Layout from './components/Layout.tsx';
import Users from "./Pages/Users.tsx";
import Analytics from "./Pages/Analytics.tsx";
import Settings from "./Pages/Settings.tsx";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;