import React, { useContext } from "react";
import { View, ActivityIndicator } from 'react-native'

import AppRouter from './app.routes'
import AuthRoutes from "./auth.routes";
import { AuthContext } from '../context/AuthContext'

function Routes() {
    const { loading, isAuthenticated } = useContext(AuthContext)
    
    if(loading){
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#1d1d2e', 
                justifyContent: 'center'
            }}>
                <ActivityIndicator size={60} color='#FFF' />
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRouter /> : <AuthRoutes />
    )
}

export default Routes