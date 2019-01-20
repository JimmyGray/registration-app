import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Button, Text } from 'react-native-elements';
import { fontSize, grey, red } from '../../theme/theme';

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
    textStyle?: any;
}

export const TextColumn = (props: IColumnProps) => <View style={styles.column}><Text style={{ ...props.textStyle, ...styles.text }}>{props.value}</Text></View>;

export const BadgeColumn = (props: IColumnProps) => (
    <View style={styles.column}>
        <Badge containerStyle={{ backgroundColor: red.red700 }}>
            <Text>{props.value}</Text>
        </Badge>
    </View>
);

export const ButtonColumn = (props: IColumnProps) => (
    <View style={styles.column}>
        <Button
            buttonStyle={styles.button}
            title={props.value}
            backgroundColor={red.red700}
            onPress={props.onPress}
            borderRadius={5}
        />
    </View>
);

export const Row = (props: IRowProps) => {
    return (
        <TouchableOpacity onLongPress={props.onLongPress}>
            <View style={styles.rowContainer}>
                {props.items.map((item, index) => {
                    if (item.type === RowType.TEXT) {
                        return (
                            <TextColumn key={item.value + index} value={item.value}/>
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: grey.grey200,
        height: 40
    },
    column: {
        flex: 1,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: fontSize.xSmall
    },
    button: {
        height: 30,
        width: 100,
        padding: 5
    }
});