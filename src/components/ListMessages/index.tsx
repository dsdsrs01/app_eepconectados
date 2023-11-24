import React, {useEffect, useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { api } from '../../service/api';
import { AuthContext } from '../../context/AuthContext';


interface ItemProps  {
    data: {
        id: string;
        message: string;
        name_user: string;
    }
}

export default function ListMessage({data}: ItemProps) {
    useEffect(() => {
        async function loadInfo() {
            console.log(data.name_user)
        }
        loadInfo();
    }, [])
    return(
        <>
            <View style={styles.container}> 
                <View style={styles.box}>
                    <Text style={styles.textName}>- {data.name_user}</Text>
                    <Text style={styles.text}>{data.message}</Text> 
                </View>
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,

    },
    box: {
        backgroundColor: 'green',
        borderRadius: 10
    },
    text: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        color: '#fff',
        padding: 10,
        borderRadius: 20,
        fontSize: 15
    },
    textName: {
        marginLeft: 9,
        marginTop: 7,
        color: '#d3d3d3'
    }
})