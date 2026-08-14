import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import { CalendarProvider } from "./context/CalendarContext";
import { MessagesProvider } from "./context/MessagesContext";
import { FilesProvider } from "./context/FilesContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { TrackerProvider } from "./context/TrackerContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Tracker from "./pages/Tracker";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import CalendarPage from "./pages/Calendar";
import Messages from "./pages/Messages";
import Files from "./pages/Files";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <CalendarProvider>
          <MessagesProvider>
            <FilesProvider>
              <NotificationsProvider>
                <TrackerProvider>
                  <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/my-tasks"
                      element={
                        <ProtectedRoute>
                          <MyTasks />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/tracker"
                      element={
                        <ProtectedRoute>
                          <Tracker />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <ProtectedRoute>
                          <Projects />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/team"
                      element={
                        <ProtectedRoute staffOnly>
                          <Team />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/reports"
                      element={
                        <ProtectedRoute>
                          <Reports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/calendar"
                      element={
                        <ProtectedRoute>
                          <CalendarPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/messages"
                      element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/files"
                      element={
                        <ProtectedRoute>
                          <Files />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <ProtectedRoute>
                          <Notifications />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  </BrowserRouter>
                </TrackerProvider>
              </NotificationsProvider>
            </FilesProvider>
          </MessagesProvider>
        </CalendarProvider>
      </TasksProvider>
    </AuthProvider>
  );
}
