import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import StyledButton from "../../Shared/Style/StyledButton"; // importar Botão Estilizado usando Styled Components


import axios from "axios";
import baseURL from "../../assets/common/baseURL";

const Register = (props) => {

    // State variables para email e senha
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // Regras para envio dados formulário
    const register = () => {
        const register = {
            email,
            name,
            phone,
            password,
        }

        // Se os dados 'input' estiverem vazios
        if (email === "" || name === "" || phone === "" || password === "") {
            // Passar mensagem de erro
            setError("Por favor, insira seus dados para completar o registro")
            // Caso contrário
        } else {
            console.log("Sucesso")
        }

        // Objeto que deverá ser passado para usuário
        let user = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            admin: false // O servidor precisa saber se o usuário é admin ou não, Default = false

        }

        // Axios POST-METHOD: chama a baseURL com a api registrar usuário e passa-se user como objeto
        axios.post(`${baseURL}users/register`, user).then((res) => {
            if (res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Registro bem-sucedido",
                    text2: "Por favor, faça login para acessar sua conta"
                })
                setTimeout(() => {
                    props.navigation.navigate("Login");
                }, 500)

            }
        })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Algo deu errado",
                    text2: "Verifique os seus dados e tente novamente"
                })
            })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Registrar"}>
                <Input
                    placeholder={"Nome"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Telefone"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Senha"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <StyledButton
                        primary
                        large
                        onPress={() => register()}
                    >
                        {/*  Texto p/ button*/}
                        <Text style={{ color: "white" }}>Registrar</Text>
                    </StyledButton>
                </View>
                <View>
                    <StyledButton
                        large
                        secondary
                        onPress={() => props.navigation.navigate("Login")}
                    >
                        <Text style={{ color: "white" }}>Voltar para Login</Text>
                    </StyledButton>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    }
})

export default Register;