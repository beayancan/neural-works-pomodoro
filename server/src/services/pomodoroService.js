import moment from "moment"
import { addMinutes } from '../utils/utils.js'

const pomodoros = {
  '1': {
    id: '1',
    userId: '1',
    startTime: new Date('2023-06-27T10:00:00Z'),
    restTime: new Date('2023-06-27T10:25:00Z'),
    endTime: new Date('2023-06-27T10:30:00Z'),
    duration: 25,
    rest: 5,
    status: 'completed',
    subscribers: [
      {
        userId: '2'
      },
      {
        userId: '3'
      }
    ]
  },
  '2': {
    id: '2',
    userId: '1',
    startTime: new Date('2023-06-27T11:00:00Z'),
    restTime: new Date('2023-06-27T11:15:00Z'),
    endTime: new Date('2023-06-27T11:20:00Z'),
    duration: 15,
    rest: 5,
    subscribers: [],
    status: 'skipped'
  },
};

const getPomodoros = async () => {
  return Object.values(pomodoros);
}

const getPomodoroById = async (id) => {
  const pomodoro = pomodoros[id];

  if (!pomodoro) {
    throw new Error('Pomodoro no encontrado');
  }

  return pomodoro;
}

const getUserPomodoros = async (userId) => {
  const userPomodoros = Object.values(pomodoros).filter(pomodoro => `${pomodoro.userId}` === userId);
  return userPomodoros;
}

const createPomodoro = async ({ userId, duration, rest, startTime }) => {
  if (!userId || !duration || !rest || !startTime){
    throw Error('Invalid parameters');
  }
  const id = `${Object.keys(pomodoros).length + 1}`;
  let newDate = startTime;
  if (typeof(startTime) === 'string'){
    newDate = new Date(startTime);
  }

  

  const restTime = addMinutes(newDate, duration);
  const endTime = addMinutes(newDate, duration + rest);
  const newPomodoro = {
    id,
    userId,
    duration,
    rest,
    startTime: newDate,
    restTime,
    endTime,
    subscribers: []
  };
  pomodoros[id] = newPomodoro;
  return pomodoros;
}

const subscribeToPomodoro = async ({ id, userId }) => {
  const pomodoro = pomodoros[id];
  if (!pomodoro) {
    throw new Error('Pomodoro no encontrado');
  }

  if (pomodoro.subscribers.find(subscriber => subscriber.userId === userId)) {
    return pomodoros;
  }

  pomodoros[id] = {
    ...pomodoro,
    subscribers: [
      ...pomodoro.subscribers,
      {
        userId
      }
    ]
  };

  return pomodoros;
}

export default {
  getPomodoros,
  getPomodoroById,
  getUserPomodoros,
  createPomodoro,
  subscribeToPomodoro
};
