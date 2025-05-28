import ConfigProvider from "antd/es/config-provider";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import {Provider} from "react-redux";

import {ProtectedLayout} from "./components/protected-layout/protected-layout";
import {HomePage} from './pages/home-page/home-page';
import {LoginPage} from "./pages/login-page/login-page";
import {RegisterPage} from "./pages/register-page/register-page";
import {TaskPage} from './pages/task-page/task-page';
import {TasksPage} from "./pages/tasks-page/tasks-page";
import {store} from "./store/config";

import './App.scss'

export const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#665df5',
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter basename="/secret-games">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedLayout />}>
            <Route index element={<HomePage />} />
            {/* todo: костыль для роутинга с github pages */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/group/:groupId/task/:taskId" element={<TaskPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
)
