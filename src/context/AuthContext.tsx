import React, { ReactNode, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../service/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loadingAuth: boolean;
    loading: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SingUpProps) => Promise<void>;
    singOut: () => Promise<void>;
}

type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}

type AuthProviderProps = {
    children: ReactNode,
}

type SingUpProps = {
    name: string,
    email: string,
    password: string
}

type SignInProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [ user, setUser ] = useState<UserProps>({
        id: '',
        email: '',
        name: '',
        token: ''
    })

    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const isAuthenticated = !!user.name; //True

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@eep');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if(Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })

                setLoading(false)
            }
        }

        getUser();
    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const response = await api.post('/users', {
                email,
                password
            })
            
            const { id, name, token } = response.data;
            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@eep', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                email,
                name,
                token
            })
            console.log(token)
            console.log('Logado com sucesse!') // Testando linha

            setLoadingAuth(false)
        } catch(err) {
            console.log(email)
            console.log(password)
            console.log('Error ao acessar', err)
            setLoadingAuth(false)
        }
    }

    async function signUp({ email, name, password }: SingUpProps) {
        try {
            const response = await api.post('/session', {
                name,
                email,
                password
            })

            console.log('Registrado com sucesso!')
        } catch(err) {
            console.log('Error ao acessar', err)
            console.log('Aqui')
        }
    }

    async function singOut() {
        await AsyncStorage.clear().then(() => {
            setUser({
                id: '',
                email: '',
                name: '',
                token: ''
            })
            console.log('Deslogado o usuario!')
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            loading,
            loadingAuth,
            singOut,
            signUp
        }}>
            {children}
        </AuthContext.Provider>
    )
}