import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURL } from '../config';
import { PomodoroForm } from '../components/PomodoroForm';

export const EditPomodoro = (props: { userEmail: string }) => {

  const params = useParams();
  const { pomodoroId } = params;
  const { userEmail } = props;
  const navigate = useNavigate();
  const [pomodoro, setPomodoro] = useState({ id: null, duration: '', rest: '' });

  const getPomodoroData = async () => {
    try {
      const response = await fetch(`${baseURL}/pomodoros/${pomodoroId}`)
        .then(data => data.json());
      setPomodoro({
        ...response,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPomodoroData();
  }, []);

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    console.log('{ ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest }', { ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest });

    try {
      const response = await fetch(`${baseURL}/pomodoros/${pomodoro.id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pomodoro, duration: +pomodoro.duration, rest: +pomodoro.rest }),
      }).then(data => data.json());
      console.log('response', response);
    } catch (error) {
      console.error(error)
    }

    navigate('/main');
  }

  return (
    <>
      { pomodoro.id && <PomodoroForm pomodoro={pomodoro} setPomodoro={setPomodoro} handleOnSubmit={handleOnSubmit} />}
    </>
  );
}
