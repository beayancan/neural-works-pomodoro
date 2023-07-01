import express from 'express';
import pomodoroController from '../controllers/pomodoroController.js';

const router = express.Router();

router.get('/pomodoros', pomodoroController.getPomodoros);
router.get('/pomodoros/:id', pomodoroController.getPomodoroById);
router.get('/pomodoros/user/:id', pomodoroController.getUserPomodoros);
router.post('/pomodoros', pomodoroController.createPomodoro);
router.post('/pomodoros/:pomodoroId/subscribe/:userId', pomodoroController.subscribePomodoro);

export default router;
