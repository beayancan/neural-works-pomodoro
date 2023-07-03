import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Button, TextField, Paper, Typography } from '@mui/material';

import { userInfo } from '../interfaces/pomodoros';
import { handleOnChange } from '../utils/forms';
import { PomodorosService } from '../services/pomodoros';

const loginDataMock = { email: 'uno@email.com', password: '' };

export const Login = (props: any) => {
  const navigate = useNavigate();
  const { setUserInfo } = props;
  const [loginData, setLoginData] = useState<userInfo>(loginDataMock);

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const body = { email: loginData.email };
    const response = await PomodorosService.login(body);
    if (response && response.email && response.id) {
      setUserInfo({
        email: response.email,
        id: response.id
      });
    }
    navigate('/main');
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
        <form onSubmit={handleOnSubmit}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
            style={{ marginBottom: '1.5rem' }}
          >
            <Typography variant="h5">
              Login
            </Typography>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '1.5rem' }}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                name="email"
                defaultValue={loginData.email}
                onChange={event => handleOnChange(event, setLoginData)}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Contraseña"
                name="password"
                defaultValue={loginData.password}
                onChange={handleOnChange}
              />
            </Grid> */}
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleOnSubmit}>
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
