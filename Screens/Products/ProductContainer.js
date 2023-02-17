import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions, StatusBar } from "react-native";
import { NativeBaseProvider, Container, Box, Header, Icon, Item, Input, Text, Right } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

/**
 * useFocusEffect + useCallBack: serve para serve para chamamar 
 * de volta os métodos http quando alterarmos algo no produto. Assim não se perde dados.
 *
 */



import axios from "axios";
import baseURL from "../../assets/common/baseURL"; // Importar a baseURL (conexão com BD)

// Importar ProductList
import ProductList from './ProductList';
import FilteredProduct from "./FilteredProducts";
import Banner from "../../Shared/Banner";
import FilteredCategories from "./FilteredCategories";




var { height } = Dimensions.get('screen')

//Importar mock-data para fazer os testes da FlatList - TRABALHAR COM DADOS ESTÁTICOS
// const data = require('../../assets/mock-data/products.json');
// const productCategories = require('../../assets/mock-data/categories.json');



// Primeiro componente do nosso aplicativo
const ProductContainer = (props) => {

    /**
     * useState = Retorna um valor com estado e uma função para atualiza-lo.
     *  
    **/
    // Setar produtos na tela home
    const [products, setProducts] = useState([]);
    // useState = Filtro produtos | IMPORTANTE!
    const [filteredProducts, setFilterProducts] = useState([]);
    // useState para funcionalidade de foco
    const [focus, setFocus] = useState();
    // useState categorias | IMPORTANTE!
    const [categories, setCategories] = useState([]);


    // Produto Categorizados
    const [categorizedProducts, setCategorizedProducts] = useState([]);
    // useState para função de atividade. Quando clicar em cima de uma 'pill', deixar como ativo (iluminado)
    const [active, setActive] = useState();
    // Estado inicial. 'renderiza' as categorias no startup do aplicativo
    const [initialState, setInitialState] = useState([]);
    // Mostrar icóne de carregamento no momento de 'buscar' dados da API. 
    const [loading, setLoading] = useState(true);

	
    // // TRABALHAR SOMENTE COM DADOS ESTATICOS PELO JSON...
    // useEffect(() => {
    //     setProducts(data);
    //     setFilterProducts(data);
    //     setFocus(false);
    //     setCategories(productCategories);
    //     setActive(-1);
    //     setInitialState(data);
    //     setCategorizedProducts(data);


    //     // setar tudo como vazio | isso evita vazamento de memória
    //     return () => {
    //         setProducts([])
    //         setFilterProducts([])
    //         setFocus()
    //         setCategories([])
    //         setActive()
    //         setInitialState()
    //     }
    // }, [])

    // Trabalhar com RESTful API utilizando axios 
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);

                // CALL AXIOS, copiei e colei os estados original e adicionei o response (res) | PRODUTOS
                axios.get(`${baseURL}products`).then((res) => {
                    setProducts(res.data);
                    setFilterProducts(res.data);
                    setCategorizedProducts(res.data);
                    setInitialState(res.data);
                    setLoading(false) // depois que renderizer o produto, setá o ícone carregamento como falso
                })
                    // Mensagem de erro
                    .catch((error) => {
                        console.log(error)
                    })

                // CALL AXIOS, copiei e colei os estados original e adicionei o response (res) | CATEGORIAS
                axios.get(`${baseURL}categories`).then((res) => {
                    setCategories(res.data);

                })
                    // Mensagem de erro
                    .catch((error) => {
                        console.log(error)
                    })


                // setar tudo como vazio | isso evita vazamento de memória
                return () => {
                    setProducts([])
                    setFilterProducts([])
                    setFocus()
                    setCategories([])
                    setActive()
                    setInitialState()
                };
            },
            [],
        )
    ))


    // Método para setar foco em produto
    const searchProduct = (text) => {
        setFocus(true);
        setFilterProducts(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    // Quando chamar o método, 'setar' o fóco como verdadeiro
    const openList = () => {
        setFocus(true);
    }

    // Método para 'borrar' a visualização produto
    const onBlur = () => {
        setFocus(false);
    }

    // Método para as categorias | PARA TRABALHAR COM DADOS ESTÁTICOS
    // const alterCategory = (cat) => {
    //     {
    //         // Se a categoria for 'todas'
    //         cat === 'all'
    //             // Então renderiza-se todos os produtos e ativa-se todos os badges
    //             ? [setCategorizedProducts(initialState), setActive(true)]
    //             // Caso contrário chamar o métdo filtrar categorias
    //             : [
    //                 setCategorizedProducts(
    //                     products.filter((i) => i.category.$oid === cat),

    //                 )
    //             ]
    //     }
    // }

    const alterCategory = (cat) => {
        {
            // Se a categoria for 'todas'
            cat === 'all'
                // Então renderiza-se todos os produtos e ativa-se todos os badges
                ? [setCategorizedProducts(initialState), setActive(true)]
                // Caso contrário chamar o métdo filtrar categorias
                : [
                    setCategorizedProducts(
                        products.filter((i) => i.category && i.category._id === cat),
                        setActive(true)

                    )
                ]
        }
    }

    return (
        // ReactFragment para encapsular toda a UI. CONDIÇÂO: se o loading for falso, renderiza-se a UI...
        <>
            {loading == false ? (
                // Encapsular todos os componentes importados do NativeBase dentro do Container
                <Container>
                    <Header searchBar rounded style={styles.search}>
                        <Item>
                            <Icon name="search" />
                            <Input                                
                                placeholder="procurar"
                                onFocus={openList}
                                onChangeText={(text) => searchProduct(text)}
                                />
                           
                        { 
                    

                            focus == true ?(
                                <Icon name="filter"
                                    size={30} color="ffffff"
                                    style={{paddingRight: 10}}
                                    onPress={() => props.navigation.navigate("Filtros")}
                                 />
                            ) : null
                        
                        
                        }


                                {
                                focus == true ? (
                                    <Icon  onPress={onBlur} name="close" />
                            
                                ) : null}

                        
                        </Item>
                    </Header>

                    {/* Se o fóco (diminuição da imagem e imformação; imagem focada) for true, então renderiza-se um novo componente, de forma focada */}
                    {/* Se for falso,  ( se o usuário não clicar em filter) mostra container normal */}
                    {focus == true ? (
                        <FilteredProduct
                            filteredProducts={filteredProducts}
                            navigation={props.navigation}
                        />
                    ) : (
                        <ScrollView>     
                                <View style={styles.container}>
                                    <View>
                                        <Banner />
                                    </View>
                                    <View>
                                        <FilteredCategories
                                            categories={categories}
                                            categoryFilter={alterCategory}
                                            categorizedProducts={categorizedProducts}
                                            active={active}
                                            setActive={setActive}
                                        />
                                    </View>
                                    {categorizedProducts.length > 0 ? (
                                        < View style={styles.productContainerList}>
                                            {categorizedProducts.map((item) => {
                                                return (
                                                    <ProductList
                                                        navigation={props.navigation}
                                                        // key={item._id.$oid} // se formor s trabalhar com dados estáticos
                                                        key={item._id}
                                                        item={item}
                                                    />
                                                )
                                            })}
                                        </View>
                                    ) : (
                                        <View style={[styles.center, { height: height / 2 }]}>
                                            <Text>Não possuímos produtos para essa categoria</Text>
                                        </View>
                                    )}
                                </View>
                        </ScrollView>
                    )}
                </Container>
            ) : (
                // ìcone Carregamento | renderiza até conectar com o servidor BD
                <Container style={[styles.center, { backgroundColor: "gold" }]}>
                    <ActivityIndicator size="large" color="#1a5a7f" />

                </Container>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    search: {
        backgroundColor: '#1a5a7f'
    },
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        paddingBottom: 1200

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    productContainerList: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "lightgrey",

    }

})


export default ProductContainer;
