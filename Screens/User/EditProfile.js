import React, { useEffect, useContext, useState, useCallback } from "react";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// Conexão BD-API
import axios from "axios";
import baseURL from "../../assets/common/baseURL"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importar métodos do ContextAPI
import AuthGlobal from "../../Context/store/AuthGlobal";



const EditProfile = (props) => {
	const context = useContext(AuthGlobal);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');


	useEffect(() => {// os dados dos usuario e popula os campos
		const dates = async () => {
			axios.get(`${baseURL}users/${context.stateUser.user.userId}`).then((res) => {
				setUserName(res.data.name),
					setUserEmail(res.data.email),
					setUserPhone(res.data.phone)
			});
		}
		dates();
	}, []);



	// Get method para pegar o perfil usuário
	const updateUser = () => {
		const user = {
			userName,
			userEmail,
			userPhone
		}
		fetch(`${baseURL}users/${context.stateUser.user.userId}`, {
			method: "PUT",
			body: JSON.stringify(user),
			headers: {
				Authorization: `Bearer ${AsyncStorage.getItem('jwt')}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
		console.log('passou aqui')
	}


	const onChangeName = (value) => {
		setUserName(value)
	}

	const onChangeEmail = (value) => {
		setUserEmail(value)
	}

	const onChangePhone = (value) => {
		setUserPhone(value)
	}


	return (
		<View style={styles.container}>

			<Text>{userName}</Text>
			<Text>{userEmail}</Text>
			<Text>{userPhone}</Text>

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

			<Button onPress={() => updateUser()} title='Update Post' />

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