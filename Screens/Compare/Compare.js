import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Container, Right, Left, H1, ListItem, Thumbnail, Body } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view'
import StyledButton from "../../Shared/Style/StyledButton"; // importar Botão Estilizado usando Styled Components


import CompareItem from "./CompareItem";

// Conexão BD-API
import axios from "axios";
import baseURL from "../../assets/common/baseURL"
import AuthGlobal from "../../Context/store/AuthGlobal";

// Esse método permite conectar react redux com o store para termos acesso ao 'State' da store
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/CartActions"

var { height, width } = Dimensions.get('screen')

 
// react fragment (<> </>) funciona como uma view; serve para encapsular código;
// esse fragment não irá ocupar um 'node' (nódulo) no código web JavaScript e HTML
// RESUMO: Encapsula tudo sem ocupar um nódulo em nosso APP. 

// CONDIÇÃO INSERIDA NO REACT FRAGMENT: se existir itensCarrinho (props.cartItem.length)
// renderiza-se Interface Usuário pelo Container

// CASO CONTRÁRIO: renderiza-se container contendo mensagem Não existe itens no Carrinho.


// após importar o métdo connect do react-redux, faz-se um map (loop) 
//no carrinho com o props dentro do componente
const Compare = (props) => {

    const context = useContext(AuthGlobal);
    // Add this
    const [productUpdate, setProductUpdate] = useState()
    const [totalPrice, setTotalPrice] = useState()
    useEffect(() => {
        getProducts()
        return () => {
            setProductUpdate()
            setTotalPrice()
        }
    }, [props])

    const getProducts = () => {
        var products = [];
        props.compareItem.forEach(compare => {
            axios.get(`${baseURL}products/${compare.product}`).then(data => {
                products.push(data.data)
                setProductUpdate(products)
                var total = 0;
                products.forEach(product => {
                    const price = (total += product.price)
                    setTotalPrice(price)
                });
            })
                .catch(e => {
                    console.log(e)
                })
        })
    }

    var total = 0;
    
    //método props.cartItem.forEach atribui todos os valores produtos de cada elemento e faz um
    //'loop' em cada ItemCarrinho. Após isso atribuí-se os valores à variável 'total'
    
    // Calcular valor total do carrinho
    props.compareItem.forEach(compare => {
        return (total += compare.product.price)
    });

    return (
        <>
            {productUpdate ? (
                <Container>
                    <H1 style={{ alignSelf: "center" }}>Comparar</H1>
                    <SwipeListView
                        data={productUpdate}
                        renderItem={(data) => (
                            <CompareItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCompare(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>$ {totalPrice}</Text>
                        </Left>
                        <Right>
                            <StyledButton
                                danger
                                medium
                                onPress={() => props.clearCompare()}
                            >
                                <Text style={{ color: 'white' }}>Limpar</Text>
                            </StyledButton>
                        </Right>
                    </View>
                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Você não selecionou produtos para comparar</Text>
                    <Text>Adicione produtos para comparação</Text>
                </Container>
            )}
        </>
    );
}

// State as props
const mapStateToProps = (state) => {
    // chamar o compareItem Reducer
    const { compareItem } = state;
    // compareItem Atibuído a compareItem
    return {
        compareItem: compareItem
    }
}

// Método para limpar carrinho: foi necessário importar o método criar em reduxStore para limpar o carrinho
// Para isso, é necessário realizar o dispatchToProps: ver docs
const mapDispatchToProps = (dispatch) => {
    // Depois do dispatch, retorna o métdo Redux ClearCart; OU SEJA:
    return {
        // Chamar método limpar carrinho com a 'arrowfunction para o método redux chamado dispatch 
        // que chama o método criado na pasta actions chamado: clearCart
        clearCompare: () => dispatch(actions.clearCompare()),
        // Chamar método removerUmItemCarrinho com a 'arrowfunction para o método redux chamado dispatch 
        // que chama o método criado na pasta actions chamado: removeFromCart
        removeFromCompare: (item) => dispatch(actions.removeFromCompare(item))
    }
}


const styles = StyleSheet.create({
    emptyCompareContainer: {
        height: height, // pega a altura inteira da tela.
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        elevation: 20,
    },
    price: {
        fontSize: 20,
        margin: 20,
        color: "darkred"
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
});

// Connect funtcion importado : Carinho ao mapStateToProps para poder despachar o item ao State
// MapState pega os Itens em props e null despacha os itens
// substituir null por mapDispatchToPRops
export default connect(mapStateToProps, mapDispatchToProps)(Compare);
