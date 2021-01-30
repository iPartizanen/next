// Instruments
import { identifyUser } from "../helpers/identifyUser";

export const getServerSideProps = async (context) => {
  const user = await identifyUser(context);

  return {
    props: {
      user,
    }
  }
};

const Home = (props) => {
  const { user } = props;

  const greetingText = user.isFamilyMember ? 'Добро пожаловать в семье!' : user.isFriend ? 
    'Приветствуем тебя, друг!' : 'Приветствуем тебя, странник!';

  return (
    <>
      <h1>{greetingText}</h1>      
    </>
  );
};

export default Home;