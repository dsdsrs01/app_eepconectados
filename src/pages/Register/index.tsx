import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthContext } from '../../context/AuthContext'

const schema = yup.object({
    name: yup.string().required('Informe seu nome'),
    email: yup.string().required('Informe seu email'),
    password: yup.string().min(6, 'A senha deve conter no minimo 6 caracteres').required('Informe a senha')
})

export default function Register() {
    const { signUp } = useContext(AuthContext)
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })  

    async function handleSingUp(data) {
        await signUp(data)
        console.log(data)
        alert('Usuario registrado com sucesso!')
    }

    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/epplogo.png')}/>
            <Controller
                control={control}
                name='name'
                render={({ field: {onChange, value} }) => (
                    <TextInput 
                        placeholder='Digite seu nome'
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
            {errors.name && <Text style={styles.labelError}>{errors.name.message}</Text>}
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
                                borderWidth: errors.password && 1,
                                borderColor: errors.password && '#ff375b'
                            }
                        ]} 
                    />
                )}
            />
            {errors.password && <Text style={styles.labelError}>{errors.password.message}</Text>}
            <TouchableOpacity onPress={handleSubmit(handleSingUp)} style={styles.button}>
                <Text style={styles.text}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
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
    labelError: {
        color: '#ff375b',
        marginBottom: 8
    }
})