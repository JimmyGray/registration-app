import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { User } from '../../../../entity/User';
import { Screens } from '../../../../Screens';
import { green, keyboardAVWithHeader } from '../../../../theme/theme';

export interface IAllergiesFormProps {
    navigation: any;
    onAddUser: (user: User) => void;
    user: User;
}

export interface IAllergiesFormState {
    allergies: Allergy[];
}

export enum Allergy {
    NUTS = 'nuts',
    RAW_EGG = 'raw_egg',
    GLUTEN = 'gluten',
    DAIRY = 'dairy',
    FISH = 'fish'
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
            <KeyboardAvoidingView style={styles.container}
                                  behavior='padding'
                                  keyboardVerticalOffset={keyboardAVWithHeader}>
                <View>
                    <CheckBox
                        title='Nuts'
                        checked={this.hasAllergy(Allergy.NUTS)}
                        onPress={this.handleOnChange.bind(this, Allergy.NUTS)}
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
                        title='Dairy'
                        checked={this.hasAllergy(Allergy.DAIRY)}
                        onPress={this.handleOnChange.bind(this, Allergy.DAIRY)}
                    />
                    <CheckBox
                        title='Fish'
                        checked={this.hasAllergy(Allergy.FISH)}
                        onPress={this.handleOnChange.bind(this, Allergy.FISH)}
                    />
                </View>
                <View>
                    <Button
                        title='Done'
                        backgroundColor={green.green700}
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