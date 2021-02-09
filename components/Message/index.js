// Core
import { useSelector } from 'react-redux';

// Instruments
import { userTypes } from '../../bus/user/types';

export const Message = () => {
  const { user } = useSelector((state) => state);

  const { userType } = user;
  const greetingText = 
    (userType === userTypes.USER_IS_FAMILY_MEMBER) ? 'Добро пожаловать в семье!'
      : (userType === userTypes.USER_IS_FRIEND) ? 'Приветствуем тебя, друг!'
        : 'Приветствуем тебя, странник!';
  
  return (
    <>
      <h1>{greetingText}</h1>      
    </>
  );
}
