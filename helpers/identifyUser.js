// Instruments
import nookies from 'nookies';
import { userTypes } from '../bus/user/types';

// Actions
import { userActions } from '../bus/user/actions';

const fs = require('fs').promises;

const USER_FILE_NAME = './data/users.json';

const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const calculateUserType = (visitCounts) =>
  (visitCounts >= 5) ? userTypes.USER_IS_FAMILY_MEMBER : 
    (visitCounts >=3 ) ? userTypes.USER_IS_FRIEND 
      : userTypes.USER_IS_GUEST;

export const identifyUser = async (context, store) => {
  let dataUsers = [];
  let user = {};

  const cookies = nookies.get(context);
  const userIdFromClient = cookies.userId;
  const raisedUserType = cookies.raisedUserType;  // if userType has been raised

  try {
    const fileUsers = await fs.readFile(USER_FILE_NAME, 'utf-8');
    dataUsers = fileUsers ? JSON.parse(fileUsers) : []; // handle logic with empty files    
  } catch (error) {
    console.error(error.message)
  }

  // finding user by userId
  const existingUserIdx = dataUsers.findIndex(item => item.userId === userIdFromClient);

  if (existingUserIdx >= 0) {
    // existing user
    dataUsers[existingUserIdx].visitCounts++;
    user = dataUsers[existingUserIdx];
  } else {
    // new user or users file was deleted
    user = {
      userId: userIdFromClient ? userIdFromClient : getUniqueId(),
      visitCounts: 0,
    };
    dataUsers.push(user);
    nookies.set(context, 'userId', user.userId, { maxAge: 2592000000, httpOnly: true });
  };

  try {
    await fs.writeFile(USER_FILE_NAME, JSON.stringify(dataUsers, null, 4));
  } catch (error) {
    console.error(error.message)
  }

  // userType based on visitCounts
  let userType = calculateUserType(user.visitCounts);

  // received userType from client (raised)
  if (raisedUserType) {
    const pageRefreshed = !context.req.headers.referer;

    if (pageRefreshed) {
      nookies.destroy(context, 'raisedUserType');
    } else {
      
      if ((userType === userTypes.USER_IS_GUEST 
        && raisedUserType !== userTypes.USER_IS_GUEST
      ) || (
        userType === userTypes.USER_IS_FRIEND
        && raisedUserType === userTypes.USER_IS_FAMILY_MEMBER
      )) {
        userType = raisedUserType;
      } else {
        nookies.destroy(context, 'raisedUserType');
      };
    };
  };
  
  user.userType = userType;

  store.dispatch(userActions.fillUser(user));

  return user;
}
