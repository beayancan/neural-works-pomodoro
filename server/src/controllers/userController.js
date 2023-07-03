import userService from '../services/userService.js'

const getUsers = async(_, res) => {
  try {
    const user = await userService.getUsers();
    res.json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const getUserById = async(req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const createUser = async(req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.createUser({ email });
    res.json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}


export default { getUsers, getUserById, createUser };
