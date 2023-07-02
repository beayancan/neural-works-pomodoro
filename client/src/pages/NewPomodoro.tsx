import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../config';
import { PomodoroForm } from '../components/PomodoroForm';

interface PomodoroCreation {
  userId: string,
  duration: number | string;
  rest: number | string;
  startTime: Date | null;
}

export const NewPomodoro = (props: { userId: string }) => {
  const { userId } = props;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState<PomodoroCreation>({ userId, duration: '', rest: '', startTime: null})

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/pomodoros`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest }),
      }).then(data => data.json());
    } catch (error) {
      console.error(error)
    }

    navigate('/main');
  }

  return (
    <PomodoroForm
      pomodoro={pomodoro}
      setPomodoro={setPomodoro}
      handleOnSubmit={handleOnSubmit}
    />
  );
}
