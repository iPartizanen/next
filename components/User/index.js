// Core
import { useSelector, useDispatch } from 'react-redux';

// Instruments
import { userTypes } from '../../bus/user/types';

// Actions
import { userActions } from '../../bus/user/actions';

export const User = () => {
  const { user } = useSelector((state) => state);
  const { userId, visitCounts, userType} = user;
  const dispatch = useDispatch();
  
  const levelUpClick = () => {
    const newUserType = (userType === userTypes.USER_IS_GUEST) 
      ? userTypes.USER_IS_FRIEND 
        : userTypes.USER_IS_FAMILY_MEMBER;

    if (userType !== newUserType) {
      dispatch(userActions.setUserType({ userType: newUserType }));
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
