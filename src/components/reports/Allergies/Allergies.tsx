import { mergeWith, startCase } from 'lodash';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { normalize, Text } from 'react-native-elements';
import { User } from '../../../entity/User';
import { blue, fontSize, grey, spacing, white } from '../../../theme/theme';
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
    image: any;
    body: JSX.Element;
}

export const ALLERGY_IMAGE_MAP = {
    [Allergy.DAIRY]: require('../../../../assets/icons/milk.png'),
    [Allergy.NUTS]: require('../../../../assets/icons/almond.png'),
    [Allergy.GLUTEN]: require('../../../../assets/icons/gluten.png'),
    [Allergy.RAW_EGG]: require('../../../../assets/icons/egg.png'),
    [Allergy.FISH]: require('../../../../assets/icons/fish.png')
};

export const AllergyCard = (props: IAllergyCardProps) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={props.image} style={{ height: 30, width: 30 }}/>
            <Text style={{ color: white, fontSize: fontSize.small }}>{startCase(props.title.replace('_', ' '))}</Text>
        </View>
        <View style={styles.body}>
            {props.body}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: spacing.xSmall,
        flexDirection: 'row'
    },
    header: {
        backgroundColor: blue.bluea400,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        minHeight: normalize(60),
        color: white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '25%'
    },
    body: {
        borderColor: grey.grey300,
        borderWidth: 1,
        width: '75%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: spacing.xxSmall,
        justifyContent: 'flex-start'
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
                    map.set(allergy, values.concat(curr));
                }
            });
            return map;
        }, new Map());
        this.setState({
            allergies
        });
    }

    public render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {Array.from(Object.keys(this.getAllergies())).map((allergy: string) => {
                    return (
                        <AllergyCard
                            title={allergy}
                            image={ALLERGY_IMAGE_MAP[allergy]}
                            key={allergy}
                            body={this.getBody(allergy)}
                        />
                    );
                })}
            </ScrollView>
        );
    }

    private getBody(allergy: Allergy) {
        const users: User[] = this.getAllergies()[allergy] || [];
        return (
          <View>
              {users.map(user => <Text key={user.id}>{user.fullName}</Text>)}
          </View>
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