/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {
  MentionInput,
  MentionSuggestionsProps,
} from 'react-native-controlled-mentions';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const suggestions = [
  {id: '1', name: 'David Tabaka'},
  {id: '2', name: 'Mary'},
  {id: '3', name: 'Tony'},
  {id: '4', name: 'Mike'},
  {id: '5', name: 'Grey'},
];

const renderSuggestions: React.FC<MentionSuggestionsProps> = ({
  keyword,
  onSuggestionPress,
}) => {
  if (keyword == null) {
    return null;
  }
  console.log('----keyword', keyword);

  return (
    <View
      style={{
        flexDirection: 'column',
        height: responsiveHeight(40),
        backgroundColor: 'black',
        width: responsiveWidth(100),
      }}>
      {suggestions.map(item => (
        <Pressable
          key={item.id}
          onPress={() => onSuggestionPress(item)}
          style={{
            padding: 12,
            backgroundColor: 'red',
            position: 'absolute',
            left: 0,
            right: 0,
            top: responsiveHeight(20),
          }}>
          <Text style={{color: 'blue'}}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

interface MentionInputsProps {}

interface MentionInputsState {
  value: string;
}

class MentionInputs extends React.Component<
  MentionInputsProps,
  MentionInputsState
> {
  constructor(props: MentionInputsProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  setValue = (text: string) => {
    this.setState({value: text});
  };

  render() {
    const {value} = this.state;
    return (
      <>
        <View style={styles.container}>
          <MentionInput
            style={{
              width: responsiveWidth(100),
              borderColor: 'red',
              borderWidth: 2,
              height: responsiveHeight(10),
            }}
            value={value}
            onChange={this.setValue}
            placeholder="dgofdfdkmvkm"
            partTypes={[
              {
                trigger: '@', // Should be a single character like '@' or '#'
                renderSuggestions: renderSuggestions,
                textStyle: {fontWeight: 'bold', color: 'red'}, // The mention style in the input
              },
            ]}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCC',
  },
});
export default MentionInputs;
