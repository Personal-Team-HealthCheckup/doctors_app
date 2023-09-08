import React from 'react';
import {Text} from 'react-native';

interface CartPageProps {}

interface CartPageState {}

class CartPage extends React.Component<CartPageProps, CartPageState> {
  constructor(props: CartPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <Text>cart page</Text>;
  }
}

export default CartPage;
