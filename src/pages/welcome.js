import React, { Component } from "react";
//import api from '../services/api';

import {Text, Dimensions, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from "react-native";

const { width: WIDTH } = Dimensions.get('window');
const HEIGHT = Dimensions.get('window').height;

export default class Login extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../images/backgroundimage.png')}style={styles.container}>
                <TouchableOpacity style={styles.btnEntrar} onPress={() => this.props.navigation.navigate('Caixaeletronico')}>
                        <Text style={styles.Texto}>Entrar</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnEntrar: {
        width: WIDTH - 100,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#DF0E1B',
        justifyContent: 'center',
        alignSelf: 'center',
        top: Platform.select({ ios: 300, android: 280 }),
    },
    Texto: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});