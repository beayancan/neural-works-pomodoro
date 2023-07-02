import React, { useState, useEffect } from 'react'
import { PomodoroCard } from './PomodoroCard';
import { baseURL } from '../config';
import { addMinutes } from '../utils/date';

export const DisplayPomodoros = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const [historial, setHistorial] = useState<Array<any>>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [remainingTime, setRemainingTime] = useState<number | null>(15);

  const getHistorialPomodoro = async () => {
    try {
      const allPomodoros = await fetch(`${baseURL}/pomodoros/user/${userId}`)
        .then((response) => response.json());
      const pomodorosValues: Array<any> = Object.values(allPomodoros);
      const sortedPomodoros: Array<{ startTime: string }> = pomodorosValues.sort((a, b) => {
        return new Date(a.startTime) > new Date(b.startTime) ? 1 : -1;
      });

      const filteredPomodoros = sortedPomodoros.filter((pomodoro: any) => addMinutes(new Date(pomodoro.startTime), +pomodoro.rest + +pomodoro.duration) >= currentTime);
      const filteredPomodorosByStartTime = sortedPomodoros.filter((pomodoro: any) => (new Date(pomodoro.startTime) >= currentTime));

      let resultInMinutes = null;
      if ( filteredPomodorosByStartTime.length ) {
        const closestPomodoroTime = new Date(filteredPomodorosByStartTime[0].startTime);
        const difference = closestPomodoroTime.getTime() - currentTime.getTime();
        resultInMinutes = Math.floor(difference / 60000);
      }
      setHistorial(filteredPomodoros);
      setRemainingTime(resultInMinutes);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {setCurrentTime(new Date())}, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getHistorialPomodoro();
  }, [currentTime]);

  return (
    <>
      <p>{ !remainingTime ? `No hay pomodoros pendientes` : `Faltan ${remainingTime} minutos para el siguiente Pomodoro` }</p>
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
