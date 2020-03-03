import React, {Component} from 'react';
import { View, Text, Card, CardItem, Left } from 'react-native';

export default class ListNotas extends Component {
    render(){
        return(
            <Card>
            <CardItem>
                <Left>
                    <Thumbnail
                    source={require('../images/2reais.png')}
                    style={{width: 80, height:60}}
                    />
                </Left>
            </CardItem>
            </Card>
        )
    }
}