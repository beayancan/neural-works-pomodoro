import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PomodoroForm } from '../components/PomodoroForm';
import { PomodorosService } from '../services/pomodoros';

export const EditPomodoro = () => {
  const params = useParams();
  const { pomodoroId } = params;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState({ id: null, duration: '', rest: '' });

  const getPomodoroData = async () => {
    const response = await PomodorosService.getPomodoro(pomodoroId);
    if (response) {
      setPomodoro({
        ...response,
      });
    }
  }

  useEffect(() => {
    getPomodoroData();
  }, []);

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const body = { ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest };
    const response: Object | null = await PomodorosService.editPomodoro(pomodoro.id, body);
    if (response) {
      navigate('/main');
    }
  }

  return (
    <>
      { pomodoro.id && <PomodoroForm pomodoro={pomodoro} setPomodoro={setPomodoro} handleOnSubmit={handleOnSubmit} />}
    </>
  );
}
