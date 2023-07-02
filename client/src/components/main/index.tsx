import { Historical } from '../historical';
import { Button } from '@mui/material';

export const MainView = (props: { userId: string, userEmail: string }) => {
  const { userId, userEmail } = props;

  const handleOnCreate = () => {
    console.log('handleOnCreate');
  }

  return (
    <div>
      { `Bienvenid@ ${userId}` }
      <Historical userId={userId} userEmail={userEmail} />
      <Button
        variant="outlined"
        onClick={handleOnCreate}
      >
        Crear Pomodoro
      </Button>
    </div>
  )
}
