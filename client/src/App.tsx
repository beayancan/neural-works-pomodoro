import { useState } from 'react';
import { Login } from './pages/Login';
import { HomeView } from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NewPomodoro } from './pages/NewPomodoro';
import { EditPomodoro } from './pages/EditPomodoro';

export const App = () => {
  const [userInfo, setUserInfo] = useState({ id: '', email: '' });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
        <Route path="/main" element={(userInfo.email) ? <HomeView userId={userInfo.id} userEmail={userInfo.email} /> : <p>error</p>} />
        <Route path="/pomodoro/create" element={<NewPomodoro userId={userInfo.id} />} />
        <Route path="/pomodoro/:pomodoroId" element={<EditPomodoro />} />
      </Routes>
    </Router>
  );
}
