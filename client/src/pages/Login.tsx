import { Grid, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userInfo } from '../interfaces/pomodoros';
import { handleOnChange } from '../utils/forms';
import { PomodorosService } from '../services/pomodoros';

export const Login = (props: any) => {
  const navigate = useNavigate();

  const { setUserInfo } = props;

  const [loginData, setLoginData] = useState<userInfo>({ email: 'uno@email.com', password: '' })

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    const body = { email: loginData.email };
    const response = await PomodorosService.login(body);

    if (response && response.email && response.id){
      setUserInfo({
        email: response.email,
        id: response.id
      });
    }
    navigate('/main')
  }

  return (
    <React.Fragment>
<form onSubmit={handleOnSubmit}>
      <Grid container spacing={2} style={{ marginTop: '5rem', marginLeft: '5rem' }}>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            defaultValue={loginData.email}
            onChange={event => handleOnChange(event, setLoginData)}
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
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleOnSubmit}
          >
            Ingresar
          </Button>
        </Grid>
      </Grid>
    </form>
    </React.Fragment>
    
  );
}
