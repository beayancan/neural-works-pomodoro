import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PomodoroForm } from '../components/PomodoroForm';
import { PomodorosService } from '../services/pomodoros';
import { PomodoroCreation } from '../interfaces/pomodoros';

const pomodoroMock = { duration: '', rest: '', startTime: null};

export const NewPomodoro = (props: { userId: string }) => {
  const { userId } = props;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState<PomodoroCreation>({ ...pomodoroMock, userId })

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const body = { ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest };
    const response = await PomodorosService.createPomodoro(body);
    if (response) {
      navigate('/main');
    }
  }

  return (
    <PomodoroForm
      pomodoro={pomodoro}
      setPomodoro={setPomodoro}
      handleOnSubmit={handleOnSubmit}
    />
  );
}
