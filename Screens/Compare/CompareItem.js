import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Image, Card, CardItem, Thumbnail, Left, Body, Right } from "native-base";

const CompareItem = (props) => {
    const data = props.item.item;

    return (
        <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
                <Left>
                    <Thumbnail source={{ uri: data.image }} />
                    <Body>
                        <Text>{data.name}</Text>
                        <Text>{data.brand}</Text>
                        <Text note>{data.description}</Text>
                    </Body>
                </Left>
                <Right>
                    <Text>R$ {data.price}</Text>
                </Right>
            </CardItem>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10
    },
    cardItem: {
        flexDirection: "row"
    }
});

export default CompareItem;
