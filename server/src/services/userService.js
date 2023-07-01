const users = [
  {
    id: '1',
    email: 'uno@email.com'
  },
  {
    id: '2',
    email: 'dos@email.com'
  },
  {
    id: '3',
    email: 'tres@email.com'
  }
]

const getUsers = async () => {
  return users;
}

const getUserById = async (id) => {
  const user = users.find(user => user.id === id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
}

const getUserByEmail = async (email) => {
  if (!email) {
    throw Error('Invalid parameters')
  }

  const usersByEmail = users.filter(user => user.email === email);

  if (!usersByEmail.length) {
    throw new Error('Usuario no encontrado');
  }

  return usersByEmail[0];
}

const createUser = async ({ email }) => {
  if (!email) {
    throw Error('Invalid parameters')
  }
  const id = `${users.length + 1}`;
  const newUser = { id, email };
  users.push(newUser);
  return newUser;
}

export default { getUsers, getUserById, getUserByEmail, createUser };
