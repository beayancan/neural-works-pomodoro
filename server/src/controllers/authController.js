import userService from '../services/userService.js';

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    res.json({ ...user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

export default { login };
