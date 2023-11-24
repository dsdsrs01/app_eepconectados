import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().required('Informe seu email'),
    password: yup.string().min(6, 'A senha deve conter no minimo 6 caracteres').required('Informe a senha')
})

export default function SignIn({ navigation }: any) {
    const { signIn } = useContext(AuthContext)
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function handleSignIn(data) {
        await signIn(data)
    }
    
    return(
        <>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../assets/epplogo.png')}/>
                <Controller
                    control={control}
                    name='email'
                    render={({ field: {onChange, value} }) => (
                        <TextInput 
                            placeholder='Digite seu email'
                            onChangeText={onChange}
                            value={value}
                            style={[
                                styles.input, {
                                    borderWidth: errors.email && 1,
                                    borderColor: errors.email && '#ff375b'
                                }
                            ]} 
                        />
                    )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email.message}</Text>}
                <Controller
                    control={control}
                    name='password'
                    render={({ field: {onChange, value} }) => (
                        <TextInput 
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                            style={[
                                styles.input, {
                                    borderWidth: errors.email && 1,
                                    borderColor: errors.email && '#ff375b'
                                }
                            ]} 
                        />
                    )}
                />
                {errors.password && <Text style={styles.labelError}>{errors.password.message}</Text>}
                <TouchableOpacity onPress={handleSubmit(handleSignIn)} style={styles.button}>
                    <Text style={styles.text}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textButtonBotton}>Não possui conta? Registre-se!</Text>
                </TouchableOpacity>
            </View>
        </>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    image: {
        width: 350,
        height: 200
    },
    input: {
        backgroundColor: '#fff',
        width: 320,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        width: 320,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#00BF63'
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    textButtonBotton: {
        color: '#FFF',
        marginTop: 8
    },
    labelError: {
        color: '#ff375b',
        marginBottom: 8
    }
})