import { countBy, Dictionary } from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import SwipeList, { ISwipeItem } from '../../common/SwipeList/SwipeList';
import { IRegisterEntry } from '../../registration/Register/RegisterOperations';

export interface IAttendancesProps {
    registerEntries: IRegisterEntry[];
    navigation: any;
}

export default class Attendances extends React.Component<IAttendancesProps> {

    public static navigationOptions = {
        title: 'Attendances'
    };

    public render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <SwipeList dataSource={this.getAttendancesDate()}/>
            </ScrollView>
        );
    }

    private getAttendancesDate(): Array<ISwipeItem<any>> {
        const userCount: Dictionary<number> = this.getAttendances();
        const sorted = Object.entries(userCount)
            .sort(([_, av], [__, bv]) => bv - av)
            .reduce((prev, [ k ,v ]) => ({ ...prev, [k]: v }), {});
        return Object.entries(sorted).map(([ k, v ]) => {
            return {
                id: k,
                text: `${k} ${v}`,
                data: v
            }
        });
    }

    private getAttendances(): Dictionary<number> {
        const userEntries: string[] = this.props.registerEntries.map((registerEntry: IRegisterEntry) => registerEntry.fullName);
        return countBy(userEntries);
    }
}

