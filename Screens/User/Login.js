import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import StyledButton from "../../Shared/Style/StyledButton"; // importar Botão Estilizado usando Styled Components


// Importar métodos do ContextAPI
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions"

const Login = (props) => {

    const context = useContext(AuthGlobal) // Usar Context Hook do React passando o AuthGlobal 
    // State variables para email e senha
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('') // outro meio de passas mensagens de erro | tem esse e o toast

    // UseEffect para as ações inciais do componente
    // O useEffect ira acionar toda vez o 'context.stateUser.isAuthenticated' muda | 
    useEffect(() => {
        // Verificar se existe  usuário ou não, se existe não mostra tela login e redireciona para perfil
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("Perfil")
        }
    }, [context.stateUser.isAuthenticated]);

    // Regras para envio dados formulário
    const handleSubmit = () => {
        const user = {
            email,
            password,
        }

        // Se o email e senha estiverem vazios
        if (email === "" || password === "") {
            // Passar mensagem de erro
            setError("Por favor, insira suas credenciais")
            // Caso contrário, efetuar login
        } else {
            loginUser(user, context.dispatch);
        }
         Toast.show({
             topOffset: 60,
             type: "success",
             text1: "Bem-vindo",
             text2: "Esse é o seu perfil"
         })
    }

    // Retornar Container Formulário 
    return (
        <FormContainer title={"Login"}>
            <Input
                placeholder={"Inserir Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={"Inserir Senha"}
                name={"password"}
                id={"password"}
                value={password}
                secureTextEntry={true} // Mantém a senha escondida
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {/* Error UI. É possível alterar a mensagem de erro na linha 24 */}
                {error ? <Error message={error} /> : null}
                <StyledButton
                    primary
                    large
                    onPress={() => handleSubmit()}
                >
                    {/*  Texto p/ button*/}
                    <Text style={{ color: "white" }}>Login</Text>
                </StyledButton>
            </View>
            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>Não possui conta?</Text>
                <StyledButton
                    secondary
                    large
                    onPress={() => props.navigation.navigate("Registrar")}

                >
                    {/*  Texto p/ button*/}
                    <Text style={{ color: "white" }}>Registrar</Text>
                </StyledButton>
            </View>

        </FormContainer>

    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: "center"
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center",
    },
})

export default Login;