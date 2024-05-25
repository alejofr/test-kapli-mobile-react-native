import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './propsParmsNavigation';


import { ListAuthors, FormAuthor } from '../screens/authors';
import { ListBooks } from '../screens/books';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name='authors'
              component={ListAuthors}
              options={{ title: 'Autores' }}
            />
            <Stack.Screen
              name='authorForm'
              component={FormAuthor}
              options={{ title: '' }}
            />
            <Stack.Screen
              name='books'
              component={ListBooks}
              options={{ title: 'Libros' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}


export default MainNavigation;
