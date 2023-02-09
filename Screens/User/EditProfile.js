import React, { useEffect, useContext, useState, useCallback } from "react";
import { TextInput, View, StyleSheet, Button, Text, ToastAndroid } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import baseURL from "../../assets/common/baseURL"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../Context/store/AuthGlobal"





const EditProfile = (props) => {
	const context = useContext(AuthGlobal);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [newPassword, setNewPassword] = useState('');


	useEffect(() => {// os dados dos usuario e popula os campos
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
			props.navigation.navigate("Usuario", { screen: "Profile" });
		}
	};



	const onChangeName = (value) => {
		setUserName(value)
	}

	const onChangeEmail = (value) => {
		setUserEmail(value)
	}

	const onChangePhone = (value) => {
		setUserPhone(value)
	}

	//const onChangePassword = (value) => {
	//	setNewPassword(value)
	//}


	return (
		<View style={styles.container}>

			<Text>{userName}</Text>
			<Text>{userEmail}</Text>
			<Text>{userPhone}</Text>
			<Text>{newPassword}</Text>

			<View style={styles.action}>
				<FontAwesome name="user-o" color="#333333" size={20} />
				<TextInput
					placeholderTextColor="#666666"
					autoCorrect={false}
					value={userName}
					onChangeText={onChangeName}
					style={styles.textInput}
				/>
			</View>

			<View style={styles.action}>
				<FontAwesome name="user-o" color="#333333" size={20} />
				<TextInput
					placeholderTextColor="#666666"
					autoCorrect={false}
					value={userEmail}
					onChangeText={onChangeEmail}
					style={styles.textInput}
				/>
			</View>

			<View style={styles.action}>
				<Feather name="phone" color="#333333" size={20} />
				<TextInput
					placeholderTextColor="#666666"
					keyboardType="number-pad"
					autoCorrect={false}
					value={userPhone}
					onChangeText={onChangePhone}
					style={styles.textInput}
				/>
			</View>

			<View style={styles.action}>
				<Feather name="lock" color="#333333" size={20} />
				<TextInput
					placeholder="Nova senha"
					placeholderTextColor="#666666"
					autoCorrect={false}
					value={newPassword}
					onChangeText={setNewPassword}
					style={styles.textInput}
					secureTextEntry={true}
				/>
			</View>

			<Button onPress={() => updateUser()} title='Editar seus dados' />


		</View>
	)
}

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
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#333333',
	},
})

export default EditProfile;