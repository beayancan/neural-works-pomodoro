import { useNavigate } from 'react-router-dom';

import { Box, Paper, Typography } from '@mui/material'

import { ActionMainButton } from '../components/ActionMainButton';
import { DisplayPomodoros } from '../components/DisplayPomodoros';

export const HomeView = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const navigate = useNavigate();

  const handleOnCreate = () => {
    navigate('/pomodoro/create')
  }

  return (
    <Box style={{ margin: '2rem' }}>
      <Paper elevation={1} style={{ padding: '2rem' }}>
        <Box style={{ marginBottom: '1rem' }}>
          <Typography variant="h4">
            Neural Works Pomodoros
          </Typography>
        </Box>
        <DisplayPomodoros userId={userId} userEmail={userEmail} />
        <ActionMainButton title={`Crear Pomodoro`} onClick={handleOnCreate} />
      </Paper>
    </Box>
  );
}
