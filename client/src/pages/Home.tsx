import { useNavigate } from 'react-router-dom';
import { DisplayPomodoros } from '../components/DisplayPomodoros';
import { Button } from '@mui/material';

export const HomeView = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;
  const navigate = useNavigate();

  const handleOnCreate = () => {
    console.log('handleOnCreate');
    navigate('/pomodoro/create')
  }

  return (
    <div>
      { `Bienvenid@ ${userId}`}
      <DisplayPomodoros userId={userId} userEmail={userEmail} />
      <Button
        variant="outlined"
        onClick={handleOnCreate}
      >
        Crear Pomodoro
      </Button>
    </div>
  )
}
