import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react';
import { api } from '../../service/api'

interface UserProps {
    data: {
        id: string;
        name: string;
    }
}

export default function ListUser({data}: UserProps) {
    // useEffect(() => {
    //     async function loadInfo(){
    //         const response = await api.get('/list')

    //         console.log(response.data)
    //     }
    //     loadInfo();
    // }, [])
    return(
        // <TouchableOpacity style={styles.button}>
        //     <Image style={styles.image} source={require('../../assets/person.png')} />
        //     <Text style={styles.text}>{data.name}</Text>
        // </TouchableOpacity>   
        <>
            <Image style={styles.image} source={require('../../assets/person.png')} />
            <Text style={styles.text}>Entrar no grupo</Text>
        </> 
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10
    },
    image: {
        backgroundColor: '#fff',
        borderRadius: 50, 
        width: 60,
        height: 60
    },
    text: {
        color: '#fff',
        fontSize: 25,
    },
})