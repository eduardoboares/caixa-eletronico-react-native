import React, { Component } from "react";

import { View, Text, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, StyleSheet, Alert, YellowBox } from "react-native";

import api from '../services/api';

YellowBox.ignoreWarnings(['Warning: Failed']);

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class Caixaeletronico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notas: [
                { id: 0, img: require("../images/100reais.png") },
                { id: 1, img: require("../images/50reais.png") },
                { id: 2, img: require("../images/20reais.png") },
                { id: 3, img: require("../images/10reais.png") },
                { id: 4, img: require("../images/5reais.png") },
                { id: 5, img: require("../images/2reais.png") }
            ],
            isVisible: false,
            valorsaq: null,
            nvalor: []
        };
    }

    state = {
        errorMessage: null
    }
    doSaque = async () => {
        try {   
            const response = await api.post('/transacao/saque', {
                valor: this.state.valorsaq
            }).then(response => { 
                const data = response.data.resultado;

                this.setState({nvalor: data});
                console.log(this.state.nvalor);
            }).catch(error => {
                Alert.alert('Valor inválido! Tente novamente');
                console.log(error)
            }); 
        }catch (error){
         console.log(error);
        }

    };  

    
    render() {
        const notas = this.state.notas;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Caixa Eletrônico</Text>
                </View>
                <Text style={styles.texto1}>Digite o valor do saque aqui!</Text>
                <View style={styles.topo}>
                    <DismissKeyboard>   
                        <TextInput
                            style={styles.input}
                            placeholder="R$ 00,00"
                            keyboardType='numeric'
                            onChangeText={(valorsaq) => this.setState({valorsaq})}
                        />
                    </DismissKeyboard>

                    <TouchableOpacity style={styles.btnSacar} onPress={() => this.setState({ isVisible: true }), this.doSaque }>
                        <Text style={styles.TxtSaq}>Sacar</Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.texto2}>Notas disponíveis para saque:</Text>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={notas}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.notaContainer}>
                            <Image style={styles.nota} source={item.img} />
                        </View>
                    )}
                    onEndReachedThreshold={0.1}
                />
                    <Text>Nota de R$100: {this.state.nvalor[0]}</Text>
                    <Text>Nota de R$50: {this.state.nvalor[1]}</Text>
                    <Text>Nota de R$20: {this.state.nvalor[2]}</Text>
                    <Text>Nota de R$10: {this.state.nvalor[3]}</Text>
                    <Text>Nota de R$5: {this.state.nvalor[4]}</Text>
                    <Text>Nota de R$2: {this.state.nvalor[5]}</Text>
                    </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        top: Platform.select({ ios: -35, android: -15 }),
    },
    header: {
        width: WIDTH,
        height: 85,
        backgroundColor: '#DF0E1B',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: 'white',
        top: Platform.select({ ios: 45, android: 25 }),
    },
    texto1: {
        top: Platform.select({ ios: 25, android: 5 }),
        fontSize: 20,
    },
    texto2: {
        top: Platform.select({ ios: -27, android: -7 }),
        fontSize: 12.5,
        fontWeight: '400',
    },
    topo: {
        top: Platform.select({ ios: 0, android: 0 }),
        alignItems: 'center',
        flexDirection: 'row',

    },
    input: {
        height: 50,
        fontSize: 20,
    },
    notaContainer: {
        alignItems: 'center',
        marginTop: -7,
        height: 89,
        width: 205
    },
    nota: {
        alignItems: 'center',
        margin: 2,
        width: 175,
        height: 80
    },
    btnSacar: {
        width: WIDTH - 300,
        height: 30,
        backgroundColor: '#DF0E1B',
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 10
    },
    TxtSaq: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
});