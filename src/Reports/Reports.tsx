import { capitalize } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import SwipeList, { ISwipeItem } from '../Common/SwipeList/SwipeList';
import { User } from '../Entity/User';
import { Screens } from '../Screens';

export interface IReportsProps {
    users: User[];
    navigation: any;
}

export const REPORT_CATEGORIES = {
    [Screens.ALLERGIES]: Screens.ALLERGIES,
    [Screens.ATTENDANCES]: Screens.ATTENDANCES
};

export default class Reports extends React.Component<IReportsProps> {

    public static navigationOptions = {
        title: 'Reports'
    };

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <SwipeList dataSource={this.getReports()} onPressRow={this.handleOnPressRow} header={{ chevron: true }}/>
            </View>
        );
    }

    private getReports(): Array<ISwipeItem<Screens>> {
        const reports: string[] = Object.keys(REPORT_CATEGORIES);
        return reports.map((key: string) => {
                const value: string = REPORT_CATEGORIES[key];
                return {
                    id: value,
                    text: capitalize(value),
                    data: Screens[key]
                };
            });
    }

    private handleOnPressRow = (screen: Screens) => {
        this.props.navigation.navigate(screen);
    };
}