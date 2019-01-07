import * as React from 'react';
import { ScrollView } from 'react-native';
import { IIcon } from './ListHeader';
import ListItem from './ListItem';

export interface IListItem {
    key: string;
    title: string;
    chevron?: boolean;
    body?: JSX.Element;
    icon?: IIcon;
    onIconPress?: () => void;
    headerRight?: JSX.Element;
}

export interface IListProps {
    items: IListItem[];
}

export default class List extends React.Component<IListProps> {
    public render() {
        return (
            <ScrollView>
                {this.props.items
                    .map(item => <ListItem
                        key={item.key}
                        body={item.body}
                        title={item.title}
                        icon={item.icon}
                        onIconPress={item.onIconPress}
                        headerRight={item.headerRight}
                        chevron={item.chevron}
                    />)}
            </ScrollView>
        );
    }
}