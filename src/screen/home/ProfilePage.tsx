import React from 'react';
import {Text} from 'react-native';

interface ProfilePageProps {}

interface ProfilePageState {}

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Text>Profile page</Text>
      </>
    );
  }
}

export default ProfilePage;
