import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react'

import ListMessage from '../../components/ListMessages';
import { api } from '../../service/api';
import { AuthContext } from '../../context/AuthContext';

type ChatProps = {
    id: string;
    message: string;
    chatUser_id: string
    name_user: string
}

export default function Chat() {
    const { user } = useContext(AuthContext)
    const [ chat, setChat ] = useState<ChatProps [] | []>([]);
    const [ text, setText ] = useState('');

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/message/list')

            setChat(response.data)
            console.log(user.name)
        }
        loadInfo();
    }, [])

    async function handleAddMessage() {
        const response = await api.post('/message', {
            message: text,
            chatUser_id: user.id, // Id do usuario que está logado
            name_user: user.name 
        })

        let data = {
            id: response.data.id as string,
            message: response.data.message as string,
            chatUser_id: response.data.chatUser_id as string,
            name_user: response.data.name_user as string
        }
        console.log(chat)
        setText('')
        setChat(oldeArray => [...oldeArray, data])
    }

    return(
        <>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, marginBottom: 24 }}
                    data={chat}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ListMessage data={item} />}
                />
            </View>
            <View style={styles.boxBotton}>
                <TextInput 
                    placeholder='Envie uma mensagem'
                    style={styles.input} 
                    value={text}
                    onChangeText={(e) => setText(e)}
                />
                <TouchableOpacity onPress={handleAddMessage} style={styles.enviar}>
                    <Image style={styles.image} source={require('../../assets/enviar.png')} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#000000'
    },
    boxBotton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        justifyContent: 'center',

        gap: 10
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: 300
    },
    image: {
        width: 50,
        height: 50,
    },
    enviar: {
        backgroundColor: '#fff',
        borderRadius: 20
    },
    text: {
        color: '#fff'
    }
})