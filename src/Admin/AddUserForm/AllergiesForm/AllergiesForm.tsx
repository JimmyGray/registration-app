import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Header } from 'react-navigation';
import { User } from '../../../Entity/User';
import { Screens } from '../../../Screens';
import { green } from '../../../theme/colors';

export interface IAllergiesFormProps {
    navigation: any;
    onAddUser: (user: User) => void;
    user: User;
}

export interface IAllergiesFormState {
    allergies: Allergy[];
}

export enum Allergy {
    NUT = 'nut',
    RAW_EGG = 'rawEgg',
    GLUTEN = 'gluten',
    WHEAT = 'wheat',
    LACTOSE = 'lactose',
    DAIRY = 'dairy',
}

export default class AllergiesForm extends React.Component<IAllergiesFormProps, IAllergiesFormState> {

    public static navigationOptions = {
        title: 'Allergies'
    };

    public constructor(props: IAllergiesFormProps) {
        super(props);
        this.state = {
            allergies: props.user.allergies
        }
    }

    public render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'
                                  keyboardVerticalOffset={Header.HEIGHT + 10}>
                <View>
                    <CheckBox
                        title='Nuts'
                        checked={this.hasAllergy(Allergy.NUT)}
                        onPress={this.handleOnChange.bind(this, Allergy.NUT)}
                    />
                    <CheckBox
                        title='Raw Egg'
                        checked={this.hasAllergy(Allergy.RAW_EGG)}
                        onPress={this.handleOnChange.bind(this, Allergy.RAW_EGG)}
                    />
                    <CheckBox
                        title='Gluten'
                        checked={this.hasAllergy(Allergy.GLUTEN)}
                        onPress={this.handleOnChange.bind(this, Allergy.GLUTEN)}
                    />
                    <CheckBox
                        title='Wheat'
                        checked={this.hasAllergy(Allergy.WHEAT)}
                        onPress={this.handleOnChange.bind(this, Allergy.WHEAT)}
                    />
                    <CheckBox
                        title='Lactose'
                        checked={this.hasAllergy(Allergy.LACTOSE)}
                        onPress={this.handleOnChange.bind(this, Allergy.LACTOSE)}
                    />
                    <CheckBox
                        title='Dairy'
                        checked={this.hasAllergy(Allergy.DAIRY)}
                        onPress={this.handleOnChange.bind(this, Allergy.DAIRY)}
                    />
                </View>
                <View>
                    <Button
                        title='Done'
                        backgroundColor={green.green600}
                        onPress={this.handleOnNext}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    private hasAllergy(allergy: Allergy) {
        return this.state.allergies.indexOf(allergy) !== -1;
    }

    private handleOnChange = (allergy: Allergy) => {
        const hasAllergy: boolean = this.hasAllergy(allergy);
        if (hasAllergy) {
            const allergies: Allergy[] = this.state.allergies.filter((x: Allergy) => x !== allergy);
            this.setState({ allergies });
        } else {
            this.setState({ allergies: this.state.allergies.concat(allergy) });
        }
    };

    private handleOnNext = () => {
        const { allergies } = this.state;
        const { user } = this.props;
        this.props.onAddUser(user.cloneWithProps({ allergies }));
        this.props.navigation.navigate(Screens.ADMIN)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    }
});