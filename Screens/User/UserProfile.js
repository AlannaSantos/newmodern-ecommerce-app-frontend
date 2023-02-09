import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native"; // componentes biblioteca react-native
import { Container } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import StyledButton from "../../Shared/Style/StyledButton";
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
                (order) => order.user._id === context.stateUser.user.userId  // id do usuário autenticado
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
    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Telefone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <StyledButton
                        danger
                        medium
                        onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)
                        ]}
                    >
                        {/*  Texto p/ button*/}
                        <Text style={{ color: "white" }}>Sair</Text>
                    </StyledButton>
                </View>
                <View>
                    <Text style={{ fontSize: 20}}>Meus Pedidos</Text>
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
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})


export default Profile;