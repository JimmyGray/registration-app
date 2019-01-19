import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { fontSize, spacing } from '../../theme/colors';

export interface IIcon {
    name: string;
    type?: string;
}

export interface IListHeaderProps {
    title: string;
    expanded: boolean;
    chevron?: boolean;
    icon?: IIcon;
    onIconPress?: () => void;
    headerRight?: JSX.Element;
}

export default class ListHeader extends React.Component<IListHeaderProps> {

    public render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                {this.props.headerRight && this.headerRight()}
                {!this.props.icon && this.props.chevron && this.getChevronIcon()}
                {this.props.icon && <Icon {...this.props.icon}/>}
            </View>
        );
    }

    private getChevronIcon() {
        const isVisible: boolean = !!this.props.icon && (this.props.chevron === undefined && !!this.props.chevron);
        if (isVisible) {
            const icon: string = this.props.expanded ? 'chevron-down' : 'chevron-right';
            return <Icon name={icon} type='evilicon'/>;
        }
    return null;
    }

    private headerRight() {
        return (
            <View>
                {this.props.headerRight}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.small,
        paddingBottom: spacing.small,
        marginRight: spacing.small,
        marginLeft: spacing.small
    },
    title: {
        fontSize: fontSize.small
    }
});