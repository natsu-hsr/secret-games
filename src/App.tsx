import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Provider} from "react-redux";

import {Header} from "./components/header/header";
import {TasksPage} from "./pages/tasks-page/tasks-page";
import {HomePage} from './pages/home-page/home-page';
import {TaskPage} from './pages/task-page/task-page';
import {store} from "./store/config";

import './App.scss'

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <div className="body-wrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/group/:groupId/task/:taskId" element={<TaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
)
