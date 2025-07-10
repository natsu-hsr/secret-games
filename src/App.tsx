import ConfigProvider from 'antd/es/config-provider';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import {ProtectedLayout} from '@components/protected-layout/protected-layout';
import {HomePage} from '@pages/home-page/home-page';
import {LoginPage} from '@pages/login-page/login-page';
import {RegisterPage} from '@pages/register-page/register-page';
import {TaskPage} from '@pages/task-page/task-page';
import {TasksPage} from '@pages/tasks-page/tasks-page';
import {store} from '@store/config';

import './App.scss'
import './shared/styles/global.scss';

export const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#665df5',
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/script/:scriptId/stage/:stageId" element={<TaskPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
)
