import React from 'react';
import { Badge, Text } from 'react-native-elements';

export interface IAllergyBadgeProps {
    title: string;
    style: any;
}

export const AllergyBadge = (props: IAllergyBadgeProps) => (
    <Badge containerStyle={props.style}>
        <Text>{props.title}</Text>
    </Badge>
);