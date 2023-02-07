import React, { useEffect, useState, useContext } from "react";
import { Text, Button, View } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StyledButton from "../../Shared/Style/StyledButton"; // importar Botão Estilizado usando Styled Components
import Toast from "react-native-toast-message";


import { connect } from "react-redux";
import AuthGlobal from "../../Context/store/AuthGlobal";





// Importar arquivo json com array de todos os países
// const countries = require('../../assets/mock-data/countries.json');

const Checkout = (props) => {
    const context = useContext(AuthGlobal);

    // Estados...
    const [orderItems, setOrderItems] = useState();
    const [street, setStreet] = useState();
    const [number, setNumber] = useState();
    const [division, setDivision] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [observations, setObservations] = useState();
    const [user, setUser] = useState();

    // UseEffect: 'sets' o pedido carrinho; o pedido vem do 'REDUX- STORE';
    // Para fazer isso seta-se ItensPedido como 'props'
    // Os ItensCarrinhos que estão armazenados no 'state store' serão passados aqui
    useEffect(() => {
        setOrderItems(props.cartItem)

        // Pegar usuario autenticdo
        if (context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId)

        } else {
            // Se não existe usuário, redireciona usuario para o checkout
            props.navigate.navigate("Carrinho");
            Toast.show({
                topOffSet: 60,
                type: "error",
                text1: "Por favor, efetue login para proceder com o checkout",
                text2: ""
            });
        }

        // Quando o componente é destruído, retorna para renderização limpa | clean screen
        return () => {
            setOrderItems();
        }
    }, [])

    // Validar os campos do formulário
    const checkout = () => {
        console.log("orders", orderItems)
        let order = {
            phone,
            street,
            number,
            division,
            city,
            zip,
            country,
            observations,
            orderItems,
            user,
            status: "3",
            date_ordered: Date.now()
        }
        // parâmetro rota
        props.navigation.navigate("Pagamento", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={75}
            enableOnAndroid={true}
        >
            <FormContainer title={"Dados de Envio"}>
                {/* <Input
                    placeholder={"Telefone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                /> */}
                <Input
                    placeholder={"Rua"}
                    name={"street"}
                    value={street}
                    onChangeText={(text) => setStreet(text)}
                />
                <Input
                    placeholder={"Numero"}
                    name={"number"}
                    value={number}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setNumber(text)}
                />
                <Input
                    placeholder={"Bairro"}
                    name={"division"}
                    value={division}
                    onChangeText={(text) => setDivision(text)}
                />
                <Input
                    placeholder={"Cidade"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"CEP"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <Input
                    placeholder={"Observações"}
                    name={"observations"}
                    value={observations}
                    onChangeText={(text) => setObservations(text)}
                />
                <Input
                    placeholder={"País"}
                    name={"country"}
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                />

                <View style={{ width: '80%', alignItems: "center" }}>
                    <StyledButton
                        primary
                        medium
                        onPress={() => checkout()}

                    >
                        <Text style={{ color: "white" }}>Confirmar</Text>
                    </StyledButton>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

// Adicionar o 'estado' para as 'props' fazendo um loop condicional (map)
const mapStateToProps = (state) => {
    const { cartItem } = state;
    return {
        cartItem: cartItem,
    }
}

export default connect(mapStateToProps)(Checkout);