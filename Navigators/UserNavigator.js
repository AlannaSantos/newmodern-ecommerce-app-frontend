import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";

const Stack = createStackNavigator();

function UserStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Registrar"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerTitle:'Edit Profile',
                    headerBackTitleVisible:false,
                    headerTitleAlign:'center',
                    headerStyle: {
                        backgroundColor:'#fff',
                        shadowColor:'#fff',
                        elevation:0,
                    },
                
                }}
            />

        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <UserStack />
}