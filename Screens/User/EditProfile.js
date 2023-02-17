import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Text, ToastAndroid  } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseURL"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../Context/store/AuthGlobal"
import StyledButton from "../../Shared/Style/StyledButton"; 
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

const EditProfile = (props) => {
	const context = useContext(AuthGlobal);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [newPassword, setNewPassword] = useState('');

	

	useEffect(() => {
		const dates = async () => {
			axios.get(`${baseURL}users/${context.stateUser.user.userId}`).then((res) => {
				setUserName(res.data.name),
				setUserEmail(res.data.email),
				setUserPhone(res.data.phone)
				setNewPassword(res.data.password)
			});
		}
		dates();
	}, []);

	const updateUser = async () => {
		
		const user = {
			name: userName,
			email: userEmail,
			phone: userPhone,
			password: newPassword
		};
		
		const jwt = await AsyncStorage.getItem('jwt');
		const headers = new Headers({
			'Authorization': `Bearer ${jwt}`,
			'Content-Type': 'application/json'
		});
		const options = {
			method: 'PUT',
			headers,
			body: JSON.stringify(user)
		};

		const response = await fetch(`${baseURL}users/${context.stateUser.user.userId}`, options);
		const data = await response.json();
		if (data) {
			ToastAndroid.showWithGravityAndOffset(
				'Dados atualizados com sucesso!',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				25,
				50,
			);
			props.navigation.navigate("Perfil");
		}
	};

	return (
	<View style={styles.container}>
		  <FormContainer title={"Atualizar Dados"}>
                <Input
					placeholderTextColor="#666666"
					autoCorrect={false}
                    placeholder={"Nome"}
					value={userName}
					onChangeText={text=>setUserName(text)}
                />
                <Input
					placeholderTextColor="#666666"
					autoCorrect={false}
                    placeholder={"Email"}
                    value={userEmail}
					onChangeText={text=> setUserEmail(text)}
                />
                <Input
					placeholderTextColor="#666666"
					autoCorrect={false}
                    placeholder={"Telefone"}
					keyboardType="number-pad"
                    value={userPhone}
					onChangeText={text=> setUserPhone(text)}
                />
                <Input
					placeholderTextColor="#666666"
					autoCorrect={false}
                    placeholder={"Senha"}
					secureTextEntry={true}
                    value={newPassword}
					onChangeText={text=>setNewPassword(text)}
                />
                <View>
                    <StyledButton
                        primary
                        large
                        onPress={() => updateUser()}
                    >
                        {/*  Texto p/ button*/}
                        <Text style={{ color: "white" }}>Atualizar dados</Text>
                    </StyledButton>
                </View>
            </FormContainer>
	</View>
	)
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
})

export default EditProfile;