import React from "react";
import { StyleSheet, View, Dimensions, Image, Text, Button } from 'react-native' // importar 'features' do ReactNative
import { connect } from "react-redux"; // importar todas as ações criadas na pasta redux
import * as actions from '../../Redux/Actions/CartActions';// importar a conexão com redux
import Toast from "react-native-toast-message"; // importar toast msg.
import StyledButton from "../../Shared/Style/StyledButton"; // importar Botão Estilizado usando Styled Components



// Atribuir variável para a largura da tela
var { width } = Dimensions.get("screen");

const ProductCard = (props) => {
    // Passar todas as 'props' em variáveis
    const { name, price, image, qty } = props;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: image }}>
            </Image>

            <View style={styles.card} />

            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>

            <Text style={styles.price}>R${price}</Text>

            {qty > 0 ? (
                <View style={{ marginBottom: 80 }}>
                    <StyledButton
                        primary
                        medium
                        //chamar o método mapDispatchToProps no onPressEvent - Redux
                        onPress={() => {
                            props.addItemToCart(props.id),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} foi adicionado ao seu carrinho`,
                                    text2: "Navegue para seu carrinho para completar o pedido"
                                });
                        }}
                    >
                        {/*  Texto p/ button*/}
                        <Text style={{ color: "white" }}>Adicionar</Text>
                    </StyledButton>

                    <StyledButton
                        secondary
                        medium
                        //chamar o método mapDispatchToProps no onPressEvent - Redux
                        onPress={() => {
                            if (props.addItemToCompare.length <= 2) {
                                props.addItemToCompare(props.id);
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} foi adicionado à tela de comparação`,
                                    text2: "Navegue para a tela 'comparar' para analisar os detalhes do produto"
                                });
                            } else if (props.addItemToCompare.length > 2){
                                Toast.show({
                                    topOffset: 60,
                                    type: "error",
                                    text1: `Você já adicionou 3 produtos para comparar`,
                                    text2: "Navegue para a tela 'comparar' para analisar os detalhes do produto"
                                });
                            }
                        }}
                    >

                        {/*  Texto p/ button*/}
                        <Text style={{ color: "white" }}>Comparar</Text>

                    </StyledButton>
                </View>

            ) : <Text style={{ marginTop: 20 }}>Indisponível em estoque</Text>
            }
        </View >
    )
}

// Map dispatch to props para poder despachar as 'ações' em ProductCard
// mapDispatchToProps pega dispatch como argumento
// Esse é o método para adicionar itemCarrinho e foi chamado no botção adicionar pelo onPress
const mapDispatchToProps = (dispatch) => {
    // retornar o método chamar button
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product })),
        addItemToCompare: (product) =>
            dispatch(actions.addToCompare({ quantity: 1, product })),
    }
}


// Variável styles (Container Estilizado)
const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.4,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -50
    },
    card: {
        marginBottom: 2,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 0
    },
    price: {
        fontSize: 18,
        color: 'darkred',
        marginTop: 5
    }

})
// connect function. como o estado incial é vazio, passa-se null, depois chama-se o método mapDispatchToProps
export default connect(null, mapDispatchToProps)(ProductCard);