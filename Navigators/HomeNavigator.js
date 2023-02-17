import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importar Containers...
import ProductContainer from "../Screens/Products/ProductContainer";
import DetailedProduct from "../Screens/Products/DetailedProduct";
import Filtros from "../Screens/Products/Filtros";
/**
 * As 'Stacks' precisarão dos 'Tabs' para serem adicionados em cima dos mesmos (Stacks) 
 * para possibilitar a renderização de componentes UI
 */

// Criar variável Stack e encapsular conteúdo do createStackNavigator
const Stack = createStackNavigator()

// Função Para retornar a Stack
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeStack"
                component={ProductContainer}
                options={{
                    headerShown: false,
                    headerTitle: null,
                }}

                
            />
        
             <Stack.Screen
                name="DetalhesProduto"
                component={DetailedProduct}
                options={{
                    headerShown: true,
                    headerTitle: null
                }}
            />
            <Stack.Screen
                name="Filtros"
                component={Filtros}
                options={{
                    headerShown: true,
                    headerTitle: null,
                    contentComponent: Filtros,
                    drawerPosition: 'right',
                    drawerWidth: 120
                }}
/>

           
        </Stack.Navigator>
    )
}


export default function HomeNavigator() {
    return <HomeStack/>
}