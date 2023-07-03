import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState, useMemo } from 'react';

import { Grid, Paper, Typography } from '@mui/material';

import { PomodoroForm } from '../components/PomodoroForm';
import { PomodorosService } from '../services/pomodoros';
import { addMinutes, formatterTime } from '../utils/date';

const pomodoroMock = { id: null, duration: '', rest: '', startTime: '' };

export const EditPomodoro = () => {
  const params = useParams();
  const { pomodoroId } = params;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState(pomodoroMock);

  const getPomodoroData = useCallback(async () => {
    const response = await PomodorosService.getPomodoro(pomodoroId);
    if (response) {
      setPomodoro({
        ...response,
      });
    }
  }, [pomodoroId, setPomodoro])

  useEffect(() => {
    getPomodoroData();
  }, [getPomodoroData]);

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const body = { ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest };
    const response: Object | null = await PomodorosService.editPomodoro(pomodoro.id, body);
    if (response) {
      navigate('/main');
    }
  }

  const endTime = useMemo(() => {
    return addMinutes(new Date(pomodoro.startTime), +pomodoro.rest + +pomodoro.duration);
  }, [pomodoro])

  const pomodoroTitle = useMemo(() => {
    return pomodoro.startTime ? `Pomodoro ${formatterTime(new Date(pomodoro.startTime))} - ${formatterTime(endTime)}` : 'Pomodoro';
  }, [pomodoro, endTime])

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
      style={{ marginTop: '2rem' }}
    >
      <Paper elevation={1} style={{ padding: '2rem' }}>
        <Grid item xs={12} style={{ marginBottom: '1rem' }}>
          <Typography
            variant="h5"
          >
            Editar { pomodoroTitle }
          </Typography>
        </Grid>
        <PomodoroForm
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          handleOnSubmit={handleOnSubmit}
        />
      </Paper>
    </Grid>
  );
}
