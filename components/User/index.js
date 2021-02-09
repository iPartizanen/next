// Core
import { useSelector, useDispatch } from 'react-redux';

// Instruments
import { userTypes } from '../../bus/user/types';
import { setCookie } from 'nookies';

// Actions
import { userActions } from '../../bus/user/actions';

// Selectors
import { selectUser } from '../../bus/user/selectors';

export const User = () => {
  const { userId, visitCounts, userType } = useSelector(selectUser);
  
  const dispatch = useDispatch();
  
  const levelUpClick = () => {
    const raisedUserType = (userType === userTypes.USER_IS_GUEST) 
      ? userTypes.USER_IS_FRIEND 
        : userTypes.USER_IS_FAMILY_MEMBER;

    if (userType !== raisedUserType) {
      dispatch(userActions.setUserType(raisedUserType));
      setCookie(null, 'raisedUserType', raisedUserType, { maxAge: 3600, path: '/' }); // 1 hour
    }  
  };

  return (
    <>
      <p>userId={userId}</p>
      <p>visitCounts={visitCounts}</p>
      <p>userType={userType}</p>   
      <button onClick={levelUpClick}>Временно повысить свой статус</button>         
    </>
  );
}
