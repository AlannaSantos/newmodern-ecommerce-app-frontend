import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native"; // componentes biblioteca react-native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../Shared/OrderCard";


// Conexão BD-API
import axios from "axios";
import baseURL from "../../assets/common/baseURL"

// Importar métodos do ContextAPI
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions"



const Profile = (props) => {
    // Declarar context para poder utilizar o mesmo
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState() // inicio, mostrar pedidos no perfil usuário


    useFocusEffect(
        useCallback(() => {
            // Condição:  se usuario não está autenticada ou se consta como nulo a a condição isAuthenticated
            // Redireciona: tela login
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

            // API call: se o usuário está autenticado, faz-se uma chamada na api para pegar o id do usuario
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })
                .catch((error) => console.log(error))

            // API call UserOrders
            axios
                .get(`${baseURL}orders`)
                .then((x) => {
                    const data = x.data;
                    // Filtrar os pedidos para pegar somente os pedidos do usuário autenticado
                    const UserOrders = data.filter(
                        (order) => order.user._id === context.stateUser.user.userId
                    );
                    setOrders(UserOrders)
                })
                .catch((error) => console.log(error))

            return () => {
                setUserProfile();
                setOrders();


            }

        }, [context.stateUser.isAuthenticated])) // Isso é acionado sempre que o 'state' (estado) muda: true or false

    // UI

    // inicio das informações do usuario, necessario separar em duas telas a de informações e pedidos.
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    style={styles.Container}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <Image style={styles.userImg} source={require('../../assets/users/user.png')}></Image>

                    <Text style={styles.userName}>
                        {userProfile ? userProfile.name : ""}
                    </Text>

                    <View style={styles.userBtnWrapper}>
                        <TouchableOpacity style={styles.userBtn} onPress={() => props.navigation.navigate("EditProfile")}>
                            <Text style={styles.userBtnTxt}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.userBtn} onPress={() => [AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)]}>
                            <Text style={styles.userBtnTxt}>Sair</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Meus Pedidos</Text>
                        <View>
                            {/* Se existe pedido então, map (loop) pedido  para mostrar no perfil*/}
                            {orders ? (
                                orders.map((x) => {
                                    return <OrderCard key={x.id} {...x} />
                                })

                            ) : (
                                <View>
                                    <Text> Você não possui pedidos</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 74
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
})


export default Profile;