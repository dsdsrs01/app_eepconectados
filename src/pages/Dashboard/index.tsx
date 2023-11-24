import { View, ScrollView, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import { useContext, useEffect, useState, ReactNode } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { api } from '../../service/api'
import ListUser from '../../components/ListUser/index'

type UserProps = {
    id: string,
    name: string,
    email: string
}

export default function Dashboard({ navigation }) {
    const [ listUser, setListUser ] = useState<UserProps [] | []>([]);
    const { singOut, user } = useContext(AuthContext)

    const searchFiltro = listUser.filter(({name}) => 
    name.toLowerCase())

    async function handleLogount() {
        console.log(listUser)
        await singOut()
    }

    // async function handleIdUser({ item }) {
    //     console.log(item.id)
    //     navigation.navigate('Chat')
    // }

    async function handleIdUser() {
        //console.log(item.id)
        navigation.navigate('Chat')
    }

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/list')

            setListUser(response.data)
        }
        loadInfo();
    }, [])

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogount}>
                    <Image style={styles.imageLogount} source={require('../../assets/logount.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Peoples')}>
                    <Image style={styles.imageLogount} source={require('../../assets/notify.png')} />
                </TouchableOpacity>
                <Text style={styles.text}>{user.name}</Text>
            </View>
            <View style={styles.container}>
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1, marginTop: 24 }}
                    data={listUser}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <>
                            <TouchableOpacity onPress={() => handleIdUser({ item })}>
                                <ListUser data={item}/>
                            </TouchableOpacity>
                        </>
                    )}
                /> */}
                 <>
                 <TouchableOpacity onPress={() => handleIdUser()} style={styles.button}>
                    <Image style={styles.image} source={require('../../assets/person.png')} />
                    <Text style={styles.text}>Ingressar no grupo</Text>
                 </TouchableOpacity>  
                </> 
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
        marginBottom: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
        gap: 10
    },
    container: {
        flex: 1,
        padding: 15,
        
        backgroundColor: '#000000'
    },
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
    imageLogount: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 60,
        height: 60
    },
    text: {
        color: '#fff',
        fontSize: 25,
    },
    textNotificacao: {
        color: '#FFF'
    }
})