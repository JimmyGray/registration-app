import * as React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { grey } from '../../../theme/theme';
import ListBody from './ListBody';
import ListHeader, { IIcon } from './ListHeader';

export interface IListProps {
    title: string;
    chevron?: boolean;
    icon?: IIcon;
    onIconPress?: () => void;
    body?: JSX.Element;
    headerRight?: JSX.Element;
}

export interface IListState {
    expanded: boolean;
}

export default class ListItem extends React.Component<IListProps, IListState> {

    constructor(props: IListProps) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    public render() {
        return (
            <View onTouchStart={this.handleOnTouch}>
                <ListHeader
                    title={this.props.title}
                    chevron={this.props.chevron}
                    icon={this.props.icon}
                    expanded={this.state.expanded}
                    onIconPress={this.props.onIconPress}
                    headerRight={this.props.headerRight}
                />
                {this.state.expanded && this.props.body && <ListBody body={this.props.body}/>}
                <Divider style={{ backgroundColor: grey.grey500 }}/>
            </View>
        );
    }

    public handleOnTouch = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };
}