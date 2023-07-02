import { Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { validateNumber } from '../utils/validations';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { addMinutes } from '../utils/date';

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
        <Grid container spacing={2} style={{ marginTop: '5rem', marginLeft: '5rem' }}>
          <Grid item xs={12}>
            <TextField
              required
              label="Duración de Trabajo"
              name="duration"
              onChange={(event) => handleOnChangeNumeric(event, setPomodoro)}
              value={pomodoro.duration}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Duración de Descanso"
              name="rest"
              onChange={(event) => handleOnChangeNumeric(event, setPomodoro)}
              value={pomodoro.rest}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                defaultValue={dayjs((new Date()).toString())}
                onChange={(value) => value}
                onAccept={(value: any) => handleChangeDate(value['$d'], setPomodoro)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={handleOnCancel}
              style={{marginRight: '2rem'}}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
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
