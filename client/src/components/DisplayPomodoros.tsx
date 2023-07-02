import { useState, useEffect } from 'react'
import { PomodoroCard } from './PomodoroCard';
import { PomodorosService } from '../services/pomodoros';

export const DisplayPomodoros = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const [historial, setHistorial] = useState<Array<any>>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [remainingTime, setRemainingTime] = useState<number | null>(15);

  const getHistorialPomodoro = async () => {
    const response = await PomodorosService.displayPomodoros(userId, currentTime);
    if (response) {
      const { filteredPomodoros, resultInMinutes } = response;   
      setHistorial(filteredPomodoros);
      setRemainingTime(resultInMinutes);
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
