import { countBy, Dictionary } from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { grey } from '../../../theme/theme';
import { IRegisterEntry } from '../../registration/Register/RegisterOperations';
import { Row, RowType, TextColumn } from '../../registration/RegisterTable/Row';

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
                <View style={styles.rowContainer}>
                    <TextColumn value='Name' textStyle={styles.columnHeader}/>
                    <TextColumn value='Attendances' textStyle={styles.columnHeader}/>
                </View>
                <ScrollView>
                    {this.getAttendancesDate()
                        .map((attendance) =>
                            <Row
                                key={attendance.name}
                                items={[
                                    {
                                        type: RowType.TEXT,
                                        value: attendance.name
                                    },
                                    {
                                        type: RowType.TEXT,
                                        value: attendance.total
                                    },
                                ]}
                            />)}
                </ScrollView>
            </ScrollView>
        );
    }

    private getAttendancesDate(): any[] {
        const userCount: Dictionary<number> = this.getAttendances();
        const sorted = Object.entries(userCount)
            .sort(([_, av], [__, bv]) => bv - av)
            .reduce((prev, [ k ,v ]) => ({ ...prev, [k]: v }), {});
        return Object.entries(sorted).map(([ name, total ]) => {
            return {
                name,
                total
            }
        });
    }

    private getAttendances(): Dictionary<number> {
        const userEntries: string[] = this.props.registerEntries.map((registerEntry: IRegisterEntry) => registerEntry.fullName);
        return countBy(userEntries);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10
    },
    dateTitle: {
        textAlign: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: grey.grey200,
        height: 40
    },
    columnHeader: {
        color: grey.grey400,
        fontWeight: 'bold'
    }
});

