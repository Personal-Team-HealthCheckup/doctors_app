import React from 'react';
import {Text} from 'react-native';

interface TokenOfferProps {}

interface TokenOfferState {}

class TokenOffer extends React.Component<TokenOfferProps, TokenOfferState> {
  constructor(props: TokenOfferProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Text>Token page</Text>
      </>
    );
  }
}

export default TokenOffer;
