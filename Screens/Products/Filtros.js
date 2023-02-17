import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, Button } from "react-native";
import { COLORS } from "./theme";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import RangeSlider from 'react-native-range-slider-expo';
import axios from "axios";
import baseURL from "../../assets/common/baseURL"; // Importar a baseURL (conexão com BD)
import Input from "../../Shared/Form/Input";

const Filtros = ({navigation}) => {

    const [products, setProducts] = useState([]);
    // useState = Filtro produtos | IMPORTANTE!
    const [filteredProducts, setFilterProducts] = useState([]);
    // useState para funcionalidade de foco
    const [focus, setFocus] = useState();
    // useState categorias | IMPORTANTE!
    const [categories, setCategories] = useState([]);
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);

    // Produto Categorizados
    const [categorizedProducts, setCategorizedProducts] = useState([]);
    // useState para função de atividade. Quando clicar em cima de uma 'pill', deixar como ativo (iluminado)
    const [active, setActive] = useState();
    // Estado inicial. 'renderiza' as categorias no startup do aplicativo
    const [initialState, setInitialState] = useState([]);
    // Mostrar icóne de carregamento no momento de 'buscar' dados da API. 
    const [loading, setLoading] = useState(true);
   
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
  
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
            <View style={styles.item}>
            <Text style={styles.title}>MARCAS</Text>

            <View style={styles.row}>

                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        alterCategory('all'), setActive(-1)
                    }}
                    style={[styles.category, { borderColor: active == -1 ? COLORS.primary  : COLORS.grey }]}
                    >
                    <Text style={[styles.subtitle, { color: active == -1 ? COLORS.primary : COLORS.grey }]}>Todas</Text>
                    
                </TouchableOpacity>

                {categories.map((item) => (
                    <TouchableOpacity
                        // key={item._id.$oid}
                        key={item.id}
                        onPress={() => {
                            // TRABALHAR COM DADOS ESTÁTICOS
                            // props.categoryFilter(item._id.$oid),
                                alterCategory(item.id),
                                setActive(categories.indexOf(item))
                        }}
                       
                        style={[styles.category, { borderColor: active == categories.indexOf(item) ?  COLORS.primary : COLORS.grey  }]}
                    >
                        <Text style={[styles.subtitle, { color: active == categories.indexOf(item)  ? COLORS.primary : COLORS.grey  }]}>{item.name}</Text>
                    </TouchableOpacity>
                
                ))}
            </View>

    
            </View>
                    
                <View>
                    <Text style={styles.title}>PREÇO</Text>
                    <RangeSlider min={0} max={10000}
                         fromValueOnChange={value => setFromValue(value)}
                         toValueOnChange={value => setToValue(value)}
                         initialFromValue={0}
                    />
                    <Text>Mínimo:  R$ {fromValue},00</Text>
                    <Text>Máximo:  R$ {toValue},00</Text>

                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("HomeStack");
                    }}
                >
                 <View>
               
              


                </View>
                <Text style={styles.buttonTxt}>Aplicar Filtros</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Filtros;