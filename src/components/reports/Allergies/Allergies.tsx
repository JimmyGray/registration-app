import { mergeWith } from 'lodash';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { normalize, Text } from 'react-native-elements';
import { User } from '../../../entity/User';
import { blue, spacing, white } from '../../../theme/theme';
import { Allergy } from '../../admin/AddUserForm/AllergiesForm/AllergiesForm';

export interface IAllergiesProps {
    users: User[];
    navigation: any;
}

export interface IAllergiesState {
    allergies: Map<Allergy, User[]>;
}

export interface IAllergyCardProps {
    title: string;
    body: JSX.Element;
}

export const AllergyCard = (props: IAllergyCardProps) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../../../../assets/icons/almond.png')} style={{ height: 30, width: 30 }}/>
            <Text>{props.title}</Text>
        </View>
        <View style={styles.body}>
            {props.body}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: spacing.small,
    },
    header: {
        backgroundColor: blue.bluea400,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: normalize(40),
        color: white
    },
    body: {
    }
});

export default class Allergies extends React.Component<IAllergiesProps, IAllergiesState> {

    public static navigationOptions = {
        title: 'Allergies'
    };

    public constructor(props: IAllergiesProps) {
        super(props);
        this.state = {
            allergies: new Map()
        };
    }

    public componentWillReceiveProps(nextProps: IAllergiesProps) {
        const allergies = nextProps.users.reduce((prev: Map<Allergy, User[]>, curr: User) => {
            const map: Map<Allergy, User[]> = prev;
            curr.allergies.forEach((allergy: Allergy) => {
                const values: User[] = map[allergy];
                if (values) {
                    map.set(allergy, values.concat(curr))
                }
            });
            return map;
        }, new Map());
        this.setState({
            allergies
        })
    }

    public render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {Array.from(Object.keys(this.getAllergies())).map((allergy: string) => {
                    const users: User[] = this.getAllergies()[allergy] || [];
                    return (
                        <AllergyCard title={allergy} key={allergy} body={users.map(user => <Text key={user.id}>{user.fullName}</Text>)}/>
                    );
                })}
            </ScrollView>
        );
    }

    private getAllergies() {
        return this.props.users.reduce((prev, currUser: User) => {
            const withUser= currUser.allergies
                .reduce((x, currAllergy: Allergy) => ({ ...x, [currAllergy]: [ currUser ] }) , {});
            return mergeWith(prev, withUser, customizer);
        }, {});
    }
}

function customizer(objValue: User[] = [], srcValue: User[]) {
    return objValue.concat(srcValue);
}