import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { addMinutes, formatterDate, formatterTime } from '../utils/date';
import { useNavigate } from 'react-router-dom';

export const PomodoroCard = ({ pomodoro, userEmail }: { pomodoro: any, userEmail: string }) => {
  const { id: pomodoroId, duration, rest, startTime } = pomodoro;
  const endTime = addMinutes(new Date(startTime), +rest + +duration);
  const navigate = useNavigate();
  const currentTime = new Date()

  const handleOnEdit = (event: any) => {
    event.preventDefault();
    navigate(`/pomodoro/${pomodoroId}`);
  }

  return (
    <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
      
      <Paper elevation={1}>
        <Card>
          <div>
            { currentTime > new Date(pomodoro.startTime) ? 'Activo' : 'Inactivo' }
          </div>
          <div>
            { currentTime > addMinutes(new Date(pomodoro.startTime), +rest + +duration) ? 'Completado' : 'Incompleto' }
          </div>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              { `${formatterDate(startTime)}` }
            </Typography>
            <Typography variant="h5" component="div">
              { `Pomodoro ${formatterTime(startTime)} - ${formatterTime(endTime)}` }
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              { `Creado por ${userEmail}` }
            </Typography>
            <Typography variant="body2">
              { `Duración: ${duration} minutos` }
              <br />
              { `Descanso: ${rest} minutos` }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Suscribirse</Button>
            <IconButton
              aria-label="share"
              onClick={handleOnEdit}
            >
              <ModeEditOutlineIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
}
