import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import Peoples from "../pages/Peoples";

const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Peoples"
                component={Peoples}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AuthRoutes