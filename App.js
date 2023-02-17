import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";

// Redux | ver doc
import { Provider } from 'react-redux';
import store from "./Redux/store";

/**
 * É necessário ENCAPSULAR toda a aplicação dentro do Redux Provider.
 * 
 * Assim o Estado (State) será gerenciado em toda a aplicação. Isso será padrão para outros componentes
 * como: Toast, MainNavigator, Header
 */

// Context API
import Auth from './Context/store/Auth'; // Wrap App in Context API to involve it in our whole app


// Importar aqui todos os Navigators | Components de navegação
import Main from './Navigators/Main';


// Importar todas a telas (Screens)
import Header from './Shared/Header';
import { View } from 'native-base';

import { LogBox } from 'react-native';

  LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

  LogBox.ignoreAllLogs();

// Componente funcional (functional component) 
export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>

  );
}