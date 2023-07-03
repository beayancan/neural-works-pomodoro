import { useState, useEffect, useCallback } from 'react';

import { Alert, AlertTitle, Grid } from '@mui/material';

import { PomodoroCard } from './PomodoroCard';
import { PomodorosService } from '../services/pomodoros';

export const DisplayPomodoros = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const [historial, setHistorial] = useState<Array<any>>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [remainingTime, setRemainingTime] = useState<number | null>(15);

  const getHistorialPomodoro = useCallback(async () => {
    const response = await PomodorosService.displayPomodoros(userId, currentTime);
    if (response) {
      const { allPomodoros, resultInMinutes } = response;   
      setHistorial(allPomodoros);
      setRemainingTime(resultInMinutes);
    }
  }, [userId, currentTime, setHistorial, setRemainingTime]);

  useEffect(() => {
    const interval = setInterval(() => {setCurrentTime(new Date())}, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getHistorialPomodoro();
  }, [getHistorialPomodoro, currentTime]);

  return (
    <>
      { !remainingTime ? (
        <Alert severity="success">
          <AlertTitle>¡Excelente!</AlertTitle>
          No te quedan Pomodoros pendientes
        </Alert>
      ) : (
        <Alert severity="info">
          <AlertTitle>Próximos Pomodoros</AlertTitle>
          Falta{remainingTime > 1 ? 'n' : ''} <strong>{ remainingTime } minuto{remainingTime > 1 ? 's' : ''}</strong> para el siguiente Pomodoro a tomar.
        </Alert>
      )}
      <Grid container spacing={2}>
        {
          historial.map((pomodoro, index): any => (
            <PomodoroCard
              key={`pomodoro-card-${index}`}
              pomodoro={pomodoro}
              userEmail={userEmail}
            />
          ))
        }
      </Grid>
    </>
  )
}
