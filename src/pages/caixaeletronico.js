import React, { Component } from "react";

import { View, Text, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet, Alert, YellowBox } from "react-native";

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
            isVisible: false,
            valorsaq: null,
            nvalor: []
        };
    }

    doSaque = async () => {
        try {
            const response = await api.post('/transacao/saque', {
                valor: this.state.valorsaq
            }).then(response => {
                const data = response.data.resultado;

                this.setState({ nvalor: data });
                console.log(this.state.nvalor);
            }).catch(error => {
                Alert.alert('Valor inválido! Tente novamente.');
                console.log(error)
            });
        } catch (error) {
            Alert.alert('Ocorreu um problema inesperado! Tente novamente mais tarde.');
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
                            onChangeText={(valorsaq) => this.setState({ valorsaq })}
                        />
                    </DismissKeyboard>

                    <TouchableOpacity style={styles.btnSacar} onPress={() => this.setState({ isVisible: true }), this.doSaque}>
                        <Text style={styles.TxtSacar}>Sacar</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.texto2}>Notas disponíveis para saque: </Text>
                <Text style={styles.texto2}>R$100.00 , R$50.00 , R$20.00 , R$10.00 , R$5.00 , R$2.00 </Text>

                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[0]}</Text>
                    <Image source={require("../images/100reais.png")} style={styles.imgnota} />
                </View>

                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[1]}</Text>
                    <Image source={require("../images/50reais.png")} style={styles.imgnota} />
                </View>

                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[2]}</Text>
                    <Image source={require("../images/20reais.png")} style={styles.imgnota} />
                </View>

                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[3]}</Text>
                    <Image source={require("../images/10reais.png")} style={styles.imgnota} />
                </View>

                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[4]}</Text>
                    <Image source={require("../images/5reais.png")} style={styles.imgnota} />
                </View>
           
                <View style={styles.saques}>
                    <Text style={styles.TxtSaq}>{this.state.nvalor[5]}</Text>
                    <Image source={require("../images/2reais.png")} style={styles.imgnota} />
                </View>

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
        top: Platform.select({ ios: 40, android: 20 }),
        fontSize: 25,
    },
    texto2: {
        top: Platform.select({ ios: 30, android: 10 }),
        fontSize: 15,
        fontWeight: '400',
    },
    topo: {
        top: Platform.select({ ios: 35, android: 15 }),
        alignItems: 'center',
        flexDirection: 'row',

    },
    input: {
        height: 80,
        fontSize: 25,
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
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: 'white',
        backgroundColor: '#DF0E1B',
        width: 70,
        height: 70,
        borderRadius: 150
    },
    TxtSacar: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    },
    imgnota: {
        width: 200,
        height: 90,
        marginLeft: 20
    },
    saques: {
        alignItems: 'center',
        flexDirection: 'row',
        top: Platform.select({ ios: 40, android: 20 }),
    }
});