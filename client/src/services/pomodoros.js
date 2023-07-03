import { baseURL } from "../config";
import { addMinutes } from "../utils/date";

export const PomodorosService = {
  login: async (body) => {
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(data => data.json());
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getPomodoro: async (pomodoroId) => {
    try {
      const response = await fetch(`${baseURL}/pomodoros/${pomodoroId}`)
        .then(data => data.json());
      return  response;
    } catch (error) {
      console.error(error);
    }
  },
  editPomodoro: async (pomodoroId, body) => {
    try {
      const response = await fetch(`${baseURL}/pomodoros/${pomodoroId}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(data => data.json());
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  createPomodoro: async (body) => {
    try {
      const response = await fetch(`${baseURL}/pomodoros`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(data => data.json());
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  displayPomodoros: async (userId, currentTime) => {
    try {
      const allPomodoros = await fetch(`${baseURL}/pomodoros/user/${userId}`)
        .then((response) => response.json());
      const pomodorosValues = Object.values(allPomodoros);
      const sortedPomodoros = pomodorosValues.sort((a, b) => {
        return new Date(a.startTime) > new Date(b.startTime) ? 1 : -1;
      });

      const filteredPomodoros = sortedPomodoros.filter(pomodoro => {
        return addMinutes(new Date(pomodoro.startTime), +pomodoro.rest + +pomodoro.duration) >= currentTime;
      });

      const filteredPomodorosByStartTime = sortedPomodoros.filter(pomodoro => (new Date(pomodoro.startTime) >= currentTime));

      let resultInMinutes = null;
      if ( filteredPomodorosByStartTime.length ) {
        const closestPomodoroTime = new Date(filteredPomodorosByStartTime[0].startTime);
        const difference = closestPomodoroTime.getTime() - currentTime.getTime();
        resultInMinutes = Math.floor(difference / 60000);
      }
      return { allPomodoros: sortedPomodoros, filteredPomodoros, resultInMinutes };
    } catch (error) {
      console.error(error);
    }
  }
}
