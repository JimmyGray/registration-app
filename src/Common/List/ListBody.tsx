import * as React from 'react';
import { View } from 'react-native';

export interface IListBodyProps {
    body: JSX.Element;
}

export default class ListBody extends React.Component<IListBodyProps> {

    public render() {
        return (
            <View>
                {this.props.body}
            </View>
        );
    }
}