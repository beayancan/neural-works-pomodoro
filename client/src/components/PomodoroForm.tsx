import { useNavigate } from 'react-router-dom';

import { Grid, Button, TextField, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import { addMinutes } from '../utils/date';
import { validateNumber } from '../utils/validations';

export const PomodoroForm = (props: { pomodoro: any, setPomodoro: any, handleOnSubmit: any }) => {
  const navigate = useNavigate();
  const { pomodoro, setPomodoro, handleOnSubmit } = props;

  const handleOnCancel = (event: any) => {
    event.preventDefault();
    navigate('/main');
  }

  const handleOnChangeNumeric = (event: any, setData: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newValue = validateNumber(value);
    setData((previous: any) => ({
      ...previous,
      [name]: (!newValue && newValue !== '') ? previous[name] : newValue,
    }));
  }

  const handleChangeDate = (value: Date, setData: any) => {
    if (!value) return;
    setData((previous: any) => ({
      ...previous,
      'startTime': value,
      'endTime': addMinutes(value, 5)
    }));
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              required
              label="Duración de Trabajo"
              name="duration"
              onChange={(event) => handleOnChangeNumeric(event, setPomodoro)}
              value={pomodoro.duration}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Duración de Descanso"
              name="rest"
              onChange={(event) => handleOnChangeNumeric(event, setPomodoro)}
              value={pomodoro.rest}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <DesktopDateTimePicker
                  onChange={(value) => value}
                  onAccept={(value: any) => handleChangeDate(value['$d'], setPomodoro)}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={handleOnCancel}
              style={{marginRight: '1rem'}}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleOnSubmit}
            >
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
