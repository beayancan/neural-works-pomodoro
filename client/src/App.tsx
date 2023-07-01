import React, { useState } from 'react';
import { Login } from './components/login';
import { MainView } from './components/main';

export const App = () => {
  const [userInfo, setUserInfo] = useState({ id: '', email: '' });

  return (
    <>
      {(!userInfo || !userInfo.email) && <Login setUserInfo={setUserInfo} />}
      {(userInfo.email) && <MainView userId={userInfo.id} userEmail={userInfo.email} />}
    </>
  );
}
