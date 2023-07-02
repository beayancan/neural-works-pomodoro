import React, { useState, useEffect } from 'react'
import { PomodoroCard } from '../pomodoroCard';

import { baseURL } from '../../../config';

export const Historical = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const [historial, setHistorial] = useState([]);

  const getHistorialPomodoro = async () => {
    try {
      const response = await fetch(`${baseURL}/pomodoros/user/${userId}`)
        .then((response) => response.json());
      setHistorial(response);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getHistorialPomodoro();
  }, [userId])

  return (
    <>
      {
        historial.map((pomodoro, index): any => (
          <PomodoroCard
            key={`pomodoro-card-${index}`}
            pomodoro={pomodoro}
            userEmail={userEmail}
          />
        ))
      }
    </>
  )
}
