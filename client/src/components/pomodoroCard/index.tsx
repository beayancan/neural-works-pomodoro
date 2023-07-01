import React from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { formatterDate, formatterTime } from '../../utils/date';

export const PomodoroCard = ({ pomodoro, userEmail }: { pomodoro: any, userEmail: string }) => {

  const { duration, rest, startTime, endTime } = pomodoro

  return (
    <>
      <Box>
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
            <IconButton aria-label="share">
              <ModeEditOutlineIcon />
          </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}
