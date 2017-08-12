import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Chat from './containers/Chat';

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Chat: { screen: Chat }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null
    }
  }
);

export default AppNavigator;
