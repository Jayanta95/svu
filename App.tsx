import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/componant/LoginScreen';
import Dashboard from './src/componant/Dashboard';
import ClassConduction from './src/componant/ClasssConduction'; // Import the new form page
import NewTable from './src/componant/NewTable';
import Profile from './src/componant/Profile';
import ThankYou from './src/componant/ThankYou';
// import Attendance from './src/componant/Attendance'

// import FormPageOne from './screens/FormPageOne';
// import FormPageTwo from './screens/FormPageTwo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            // headerLeft: () => false,
            headerShown: false,
          }}
        />
        <Stack.Screen name="ClassConduction" component={ClassConduction} options={{headerShown: false}} />

        <Stack.Screen name="NewTable" component={NewTable} />
   
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="ThankYou"
          component={ThankYou}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Attendance" component={Attendance} /> */}
        {/* New Form Page */}
        {/* <Stack.Screen name="FormPageOne" component={FormPageOne} /> */}
        {/* <Stack.Screen name="FormPageTwo" component={FormPageTwo} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
