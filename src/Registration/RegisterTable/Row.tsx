import * as React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Badge, Button, Text } from 'react-native-elements';
import { grey, red } from '../../theme/colors';

export enum RowType {
    TEXT = 'TEXT',
    BADGE = 'BADGE',
    BUTTON = 'BUTTON'
}

export interface IRowItem {
    type: RowType;
    value: string;
    onPress?: any;
}

export interface IRowProps {
    items: IRowItem[];
    onLongPress?: () => void;
}

export interface IColumnProps {
    value: string;
    onPress?: any;
}

export const TextColumn = (props: IColumnProps) => (
    <View style={styles.Column}><Text>{props.value}</Text></View>
);

export const BadgeColumn = (props: IColumnProps) => (
    <View style={styles.Column}>
        <Badge containerStyle={{ backgroundColor: red.red500 }}>
            <Text>{props.value}</Text>
        </Badge>
    </View>
);

export const ButtonColumn = (props: IColumnProps) => (
    <View style={styles.Column}>
        <Button
            buttonStyle={styles.button}
            title={props.value}
            backgroundColor={grey.grey600}
            onPress={props.onPress}
            borderRadius={5}
        />
    </View>
);

export const Row = (props: IRowProps) => {
    return (
        <TouchableNativeFeedback style={styles.rowContainer} onLongPress={props.onLongPress}>
            <View style={styles.rowContainer}>
                {props.items.map((item) => {
                    if (item.type === RowType.TEXT) {
                        return (
                            <TextColumn key={item.value} value={item.value}/>
                        );
                    } else if (item.type === RowType.BADGE) {
                        return (
                            <BadgeColumn value={item.value}/>
                        );
                    } else if (item.type === RowType.BUTTON) {
                        return (
                            <ButtonColumn key={item.value} value={item.value} onPress={item.onPress}/>
                        );
                    }
                    return null;
                })}
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: grey.grey600,
        height: 50
    },
    Column: {
        flex: 1,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    button: {
        height: 40,
        width: 100
    }
});