import pomodoroService from '../services/pomodoroService.js'

const getPomodoros = async(req, res) => {
  try {
    const pomodoro = await pomodoroService.getPomodoros();
    res.json(pomodoro)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const getPomodoroById = async(req, res) => {
  try {
    const pomodoro = await pomodoroService.getPomodoroById(req.params.id);
    res.json(pomodoro)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const getUserPomodoros = async(req, res) => {
  try {
    const pomodoros = await pomodoroService.getUserPomodoros(req.params.id);
    res.json(pomodoros)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const createPomodoro = async(req, res) => {
  try {
    const { userId, duration, rest, startTime } = req.body;
    const pomodoro = await pomodoroService.createPomodoro({ userId, duration, rest, startTime });
    res.json(pomodoro)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}


const subscribePomodoro = async(req, res) => {
  try {
    const { pomodoroId: id, userId } = req.params;
    const pomodoro = await pomodoroService.subscribeToPomodoro({ id, userId });
    res.json(pomodoro)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export default { getPomodoros, getPomodoroById, getUserPomodoros, createPomodoro, subscribePomodoro };
