import { ThemeProvider } from '@/components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import NotFound from './screens/404';
import './App.css';
import Login from './screens/login';
import Register from './screens/register';
import Amnesia from './screens/amnesia';
import { Toaster } from './components/ui/sonner';
import ProjectDashboard from './screens/projects';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ProjectCreate from './screens/projects/create';

function App() {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const apiClient = new ApolloClient({
        uri: apiUrl,
        cache: new InMemoryCache({
            addTypename:false
        }),        
    });

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ApolloProvider client={apiClient}>
                    <Routes>
                        <Route
                            path="/projects/:id"
                            element={<ProjectDashboard />}
                        />
                        <Route
                            path="projects/create"
                            element={<ProjectCreate />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/amnesia" element={<Amnesia />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ApolloProvider>
                <Toaster position="top-right" />
            </ThemeProvider>
        </>
    );
}

export default App;
