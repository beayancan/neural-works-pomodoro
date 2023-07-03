export interface userInfo {
  email: string;
  password: string;
}

export interface PomodoroCreation {
  userId: string,
  duration: number | string;
  rest: number | string;
  startTime: Date | null;
}

export interface Pomodoro {
  userId: string,
  duration: number;
  rest: number;
  startTime: string;
}
