import React from 'react';
import { Text, TextProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
interface Iprops extends TextProps {
    colors: string[]
    locations?: number[] | undefined

}
const CommonGradientText = (props: Iprops) => {
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={props.colors}
                start={{ x: 0, y: 0 }}
                locations={props.locations}
                end={{ x: 1, y: 0 }}>
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default CommonGradientText;