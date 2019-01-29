import { capitalize, mergeWith } from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { Allergy } from '../../admin/AddUserForm/AllergiesForm/AllergiesForm';
import { User } from '../../../entity/User';

export interface IAllergiesProps {
    users: User[];
    navigation: any;
}

export interface IAllergiesState {
    allergies: Map<Allergy, User[]>;
}

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
                      <Card title={capitalize(allergy)} key={allergy}>
                          {users.map(user => <Text key={user.id}>{user.fullName}</Text>)}
                      </Card>
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
