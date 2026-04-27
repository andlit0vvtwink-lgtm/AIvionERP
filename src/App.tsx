import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import SubProjectPage from './pages/SubProject';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/Calendar';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Materials from './pages/Materials';
import SearchPage from './pages/Search';
import Settings from './pages/Settings';
import Sites from './pages/Sites';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/projects/:projectId/sub/:subId" element={<SubProjectPage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId" element={<ClientDetail />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sites" element={<Sites />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
