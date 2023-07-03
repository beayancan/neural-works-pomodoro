import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { addMinutes, formatterDate, formatterTime } from '../utils/date';

export const PomodoroCard = ({ pomodoro, userEmail }: { pomodoro: any, userEmail: string }) => {
  const navigate = useNavigate();

  const handleOnEdit = (event: any) => {
    event.preventDefault();
    navigate(`/pomodoro/${pomodoro.id}`);
  }

  const currentTime = useMemo(() => {
    return new Date();
  }, []);

  const isActive = useMemo(() => {
    return currentTime > new Date(pomodoro.startTime);
  }, [currentTime, pomodoro]);

  const isCompleted = useMemo(() => {
    return currentTime > addMinutes(new Date(pomodoro.startTime), +pomodoro.duration);
  }, [currentTime, pomodoro]);

  const endTime = useMemo(() => {
    return addMinutes(new Date(pomodoro.startTime), +pomodoro.rest + +pomodoro.duration);
  }, [pomodoro]);

  return (
    <Grid item style={{marginTop: '1rem', marginBottom: '1rem'}} xs={6}>
        <Card elevation={1} style={{ paddingBottom: '1rem' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `${formatterDate(pomodoro.startTime)}` }
            </Typography>
            <Typography variant="h5" component="div">
              { `Pomodoro ${formatterTime(pomodoro.startTime)} - ${formatterTime(endTime)}` }
            </Typography>
            <Grid container spacing={1} direction="row" alignItems="center" sx={{ mb: 1.5, mt: 0.5 }}>
              <Grid item>
              { isCompleted ? (
                <CheckCircleOutlineIcon sx={{ color: 'green' }} />
              ) : (
                isActive ? (
                  <PlayCircleOutlineIcon sx={{ color: 'yellow' }} />
                ) : (
                  <PauseCircleOutlineIcon sx={{ color: 'red' }} />
              ))}
              </Grid>
              <Grid item>
                <Typography color="text.primary" variant='body1'>
                { isCompleted ? 'Completado' : (isActive ? 'En curso' : 'Inactivo') }
                </Typography>
              </Grid>
            </Grid>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              { `Duración: ${pomodoro.duration} minutos` }
              <br />
              { `Descanso: ${pomodoro.rest} minutos` }
            </Typography>
            <Typography color="text.secondary" variant="body2">
              { `Creado por ${userEmail}` }
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Suscribirse</Button> */}
            <Grid container style={{ marginLeft: '0.5rem' }}>
              <Button
                variant="outlined"
                startIcon={<ModeEditOutlineIcon/>}
                onClick={handleOnEdit}
                >
                Editar
              </Button>
            </Grid>
          </CardActions>
        </Card>
    </Grid>
  );
}
