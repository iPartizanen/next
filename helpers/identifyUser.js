// Instruments
import nookies from 'nookies';
const fs = require('fs').promises;

const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

export const identifyUser = async (context) => {
  let
    user = {},
    dataUsers = [],
    isGuest = true,
    isFriend = false,
    isFamilyMember = false;

  const cookies = nookies.get(context);
  const userIdFromClient = cookies.userId;

  try {
    const fileUsers = await fs.readFile('./data/users.json', 'utf-8');
    dataUsers = fileUsers ? JSON.parse(fileUsers) : []; // handle logic with empty files    
  } catch (error) {
    console.error(error.message)
  }

  // finding user by userId
  const existingUserIdx = dataUsers.findIndex(item => item.userId == userIdFromClient);

  if (existingUserIdx >= 0) {
    // existing user
    dataUsers[existingUserIdx].visitCounts++;
    user = dataUsers[existingUserIdx];
  } else {
    // new user
    user = {
      userId: getUniqueId(),
      visitCounts: 1
    };
    dataUsers.push(user);
    nookies.set(context, 'userId', user.userId, { maxAge: 2592000000, httpOnly: true });
  };

  try {
    await fs.writeFile('./data/users.json', JSON.stringify(dataUsers, null, 4));
  } catch (error) {
    console.error(error.message)
  }

  const { visitCounts } = user;

  isGuest = visitCounts < 3;
  isFriend = visitCounts >= 3 && visitCounts < 5;
  isFamilyMember = visitCounts >= 5;

  return {
    isGuest,
    isFriend,
    isFamilyMember,
    visitCounts,
    userId: user.userId,
  }
}
