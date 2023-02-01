import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

const OrderCard = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/api/products/${props.orderItems.product}`);
      setProduct(result.data);
    }
    fetchData();
  }, []);

  const order = {
    id: props.id,
    user: props.user,
    date_ordered: props.date_ordered,
    orderItems: props.orderItems,
    phone: props.phone,
    street: props.street,
    number: props.number,
    city: props.city,
    zip: props.zip,
    country: props.country,
    total_price: props.total_price,
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Numero do Pedido #{props.id}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        {props.orderItems.map((item, index) => (
          <View key={index} style={{ marginTop: 10 }}>
            <Text>Nome do produto: {product.name}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Preço: R$ {product.price}</Text>
          </View>
        ))}
        <Text>
          Endereço {props.street} {props.number}
        </Text>
        <Text>Cidade: {props.city}</Text>
        <Text>País: {props.country}</Text>
        <Text>Data do pedido {props.date_ordered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Valor: </Text>
          <Text style={styles.price}>R$ {props.total_price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "red",
    fontWeight: "bold",
  },
});

export default OrderCard;
