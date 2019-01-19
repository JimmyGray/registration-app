import * as React from 'react';
import { ListView, ListViewDataSource, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { fontSize, grey, white } from '../../theme/colors';

export interface ISwipeItem<T> {
    id: string;
    text?: string;
    data: T;
    component?: JSX.Element;
}

export interface ISwipeButton {
    text: string,
    backgroundColor: any;
    onPress: any;
}

export interface ISwipeListHeaderProps {
    chevron?: boolean;
    button?: any;
}

export interface ISwipeListProps<T> {
    dataSource: Array<ISwipeItem<T>>;
    swipeButtons?: ISwipeButton[];
    onPressRow?: (swipeItem: T) => void
    header?: ISwipeListHeaderProps
}

export interface ISwipeListState {
    dataSource: ListViewDataSource;
}

export default class SwipeList<T> extends React.Component<ISwipeListProps<T>, ISwipeListState> {

    public ds: ListViewDataSource;

    constructor(props: ISwipeListProps<T>) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (a, b) => true });
        this.state = {
            dataSource: this.ds.cloneWithRows(props.dataSource)
        };
    }

    public componentWillReceiveProps(props: ISwipeListProps<T>) {
        if (props.dataSource !== this.props.dataSource) {
            const dataSource = this.state.dataSource.cloneWithRows(props.dataSource || []);
            this.setState({ dataSource });
        }
    }

    public render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this.renderRow}/>
        );
    }

    private renderRow = (swipeItem: ISwipeItem<T>) => {
        return (
            <Swipeout right={this.getSwipeButtonProps(swipeItem)}
                      autoClose={true}
                      style={styles.swipeout}
                      backgroundColor={white}>
                <TouchableOpacity onPress={this.props.onPressRow && this.props.onPressRow.bind(this, swipeItem.data)}>
                    <View style={styles.rowContainer}>
                        {this.getSwipeItemContent(swipeItem)}
                        <View>
                            {this.getSwipeItemRightContent(swipeItem)}
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    };

    private getSwipeItemContent(swipeItem: ISwipeItem<T>): JSX.Element | null {
        if (swipeItem.text) {
            return <Text style={styles.text}>{swipeItem.text}</Text>;
        } else if (swipeItem.component) {
            return swipeItem.component
        }
        return null;
    }

    private getSwipeItemRightContent(swipeItem: ISwipeItem<T>): JSX.Element | null {
        if (this.hasHeaderChevron) {
            return <Icon name='chevron-right' type='evilicon'/>;
        } else if (this.hasHeaderButton && !this.hasHeaderChevron) {
            return <Button {...this.props.header!.button} onPress={this.props.header!.button.onPress.bind(this, swipeItem.data)}/>;
        }
        return null;
    }

    private get hasHeaderChevron(): boolean {
        return this.props.header && this.props.header.chevron || false;
    }

    private get hasHeaderButton(): boolean {
        return this.props.header && this.props.header.button;
    }

    private getSwipeButtonProps(swipeItem: ISwipeItem<T>) {
        const swipeButtons: ISwipeButton[] = this.props.swipeButtons || [];
        return swipeButtons.map((button: ISwipeButton) => ({
            ...button,
            onPress: button.onPress.bind(this, swipeItem.id)
        }));
    }
}

const styles = StyleSheet.create({
    noUsers: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swipeout: {
        borderBottomWidth: 1,
        borderBottomColor: grey.grey200
    },
    text: {
        flex: 2,
        fontSize: fontSize.small,
        padding: 10,
        borderBottomColor: grey.grey200
    },
    rowContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
});