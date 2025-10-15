import React from 'react';
import { Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LocationManagerProps {}

interface LocationManagerState {}

class LocationManager extends React.Component<
  LocationManagerProps,
  LocationManagerState
> {
  constructor(props: LocationManagerProps) {
    super(props);
    this.state = {};
  }
  componentDidMount(): void {
    Geolocation.getCurrentPosition(
      async position => {
        console.log('----position', position);
      },
      error => {
        console.log('----position', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }
  render() {
    return <Text>text</Text>;
  }
}

export default LocationManager;
