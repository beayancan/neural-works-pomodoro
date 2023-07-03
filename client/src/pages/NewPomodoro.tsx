import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Typography } from '@mui/material'

import { PomodoroForm } from '../components/PomodoroForm';
import { PomodorosService } from '../services/pomodoros';
import { PomodoroCreation } from '../interfaces/pomodoros';

const pomodoroMock = { duration: '', rest: '', startTime: null};

export const NewPomodoro = (props: { userId: string }) => {
  const { userId } = props;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState<PomodoroCreation>({ ...pomodoroMock, userId })

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const body = { ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest };
    const response = await PomodorosService.createPomodoro(body);
    if (response) {
      navigate('/main');
    }
  }

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
            Crear nuevo Pomodoro
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
