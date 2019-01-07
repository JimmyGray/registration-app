import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { Screens } from '../Screens';
import { green } from '../theme/colors';
import { IRegister } from './RegisterListOperations';

export interface IRegisterListProps {
    registerList: IRegister[];
    addRegister: () => void;
    selectRegister: (id: string) => void;
    navigation: any;
}

export interface IRegisterListState {
    query: string;
    modalVisible: boolean;
}

export default class RegisterList extends React.Component<IRegisterListProps, IRegisterListState> {

    public static navigationOptions = {
        title: 'Register List'
    };

    public render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <List containerStyle={styles.listContainer}>
                        {this.props.registerList.map((register: IRegister) =>
                            <ListItem
                                key={register.id}
                                title={register.date.toDateString()}
                                onPress={this.handleOnSelectRegister.bind(this, register.id)}
                            />)}
                    </List>
                </ScrollView>
                <View>
                    <Button title='Add' onPress={this.handleOnAddNewRegister} backgroundColor={green.green600}/>
                </View>
            </View>
        );
    }

    private handleOnAddNewRegister = () => {
        this.props.addRegister();
    };

    private handleOnSelectRegister = (id: string) => {
        this.props.selectRegister(id);
        this.props.navigation.navigate(Screens.REGISTER);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    listContainer: {
        marginBottom: 10,
        marginTop: 0
    }
});