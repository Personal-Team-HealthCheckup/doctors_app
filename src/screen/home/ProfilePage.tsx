import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  HomeScreenPng2 as HomeScreenPng,
  imageProfile1,
} from '../../assets/assets';
import Header from '../../Components/common/CustomHeader';
import { COLORS, FONTS } from '../../global/theme';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomGButton from '../../Components/common/CustomGButton';
import { closeKeyBoard } from '../../helper/utilities';
import { Navigation } from '../../global/types';
import { connect } from 'react-redux';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import {
  getProfileAction,
  updateProfileAction,
} from '../../redux/reducers/profileSlice';
import type { AppDispatch, RootState } from '../../redux/store';
interface ProfilePageProps {
  navigation?: Navigation;
}

interface ProfilePageState {
  isEditMode: boolean;
  formValues: ProfileFormValues;
  localMessage: string | null;
  selectedImage: SelectedImage | null;
}

interface ReduxProps {
  data: RootState['Profile']['data'];
  loading: RootState['Profile']['loading'];
  message: RootState['Profile']['message'];
  getProfileApi: () => Promise<unknown>;
  updateProfileApi: (payload: FormData) => Promise<unknown>;
}

type Props = ProfilePageProps & ReduxProps;

interface ProfileFormValues {
  fullName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  profileImageUrl: string | null;
}

type SelectedImage = {
  uri: string;
  type: string;
  name: string;
};

class ProfilePage extends React.Component<Props, ProfilePageState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditMode: false,
      formValues: this.buildFormValues(props.data),
      localMessage: null,
      selectedImage: null,
    };
  }

  loadProfile = async () => {
    await this.props.getProfileApi();
  };

  componentDidMount() {
    this.loadProfile();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.data !== prevProps.data &&
      !this.state.isEditMode &&
      this.props.data
    ) {
      this.setState({
        formValues: this.buildFormValues(this.props.data),
        selectedImage: null,
      });
    }
  }

  private buildFormValues(data: ReduxProps['data']): ProfileFormValues {
    return {
      fullName: data?.fullName ?? '',
      phoneNumber: data?.phoneNumber ?? '',
      userName: data?.userName ?? '',
      email: data?.email ?? '',
      profileImageUrl: data?.profileImage?.imageUrl ?? null,
    };
  }

  handleInputChange = (field: keyof ProfileFormValues, value: string) => {
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [field]: value,
      },
      localMessage: null,
    }));
  };

  enableEdit = () => {
    this.setState({
      isEditMode: true,
      formValues: this.buildFormValues(this.props.data),
      localMessage: null,
      selectedImage: null,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditMode: false,
      formValues: this.buildFormValues(this.props.data),
      localMessage: null,
      selectedImage: null,
    });
  };

  handlePickImage = async () => {
    try {
      const result: ImageOrVideo = await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        multiple: false,
      });

      const selected: SelectedImage = {
        uri: result.path,
        type: result.mime || 'image/jpeg',
        name:
          result.filename ||
          result.path?.split('/')?.pop() ||
          `profile_${Date.now()}.jpg`,
      };

      this.setState({ selectedImage: selected, localMessage: null });
    } catch (error: any) {
      if (error?.code === 'E_PICKER_CANCELLED') {
        return;
      }
      console.warn('Image picker error', error);
      this.setState({
        localMessage: 'Unable to pick image. Please try again.',
      });
    }
  };

  handleSave = async () => {
    const { updateProfileApi, data, getProfileApi } = this.props;
    const { formValues, selectedImage } = this.state;

    closeKeyBoard();

    const trimmedName = formValues.fullName.trim();
    const trimmedPhone = formValues.phoneNumber.trim();
    const trimmedEmail = formValues.email.trim();

    if (!trimmedName) {
      this.setState({ localMessage: 'Full name is required.' });
      return;
    }

    if (!trimmedEmail) {
      this.setState({ localMessage: 'Email cannot be empty.' });
      return;
    }

    if (!trimmedPhone) {
      this.setState({ localMessage: 'Phone number cannot be empty.' });
      return;
    }

    const hasNameChange = trimmedName !== (data?.fullName ?? '');
    const hasPhoneChange = trimmedPhone !== (data?.phoneNumber ?? '');
    const hasImageChange = Boolean(selectedImage);

    if (!hasNameChange && !hasPhoneChange && !hasImageChange) {
      this.setState({
        localMessage: 'No changes detected.',
      });
      return;
    }

    const formData = new FormData();

    if (hasNameChange) {
      formData.append('fullName', trimmedName);
    }

    if (hasPhoneChange) {
      formData.append('phoneNumber', trimmedPhone);
    }

    if (hasImageChange && selectedImage) {
      formData.append('profileImage', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      } as any);
    }

    const selectedImageRef = selectedImage;

    try {
      await updateProfileApi(formData);

      this.setState(prevState => ({
        isEditMode: false,
        localMessage: null,
        selectedImage: null,
        formValues: {
          ...prevState.formValues,
          fullName: hasNameChange ? trimmedName : prevState.formValues.fullName,
          phoneNumber: hasPhoneChange
            ? trimmedPhone
            : prevState.formValues.phoneNumber,
          profileImageUrl:
            selectedImageRef?.uri ?? prevState.formValues.profileImageUrl,
        },
      }));
      await getProfileApi();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update profile.';
      this.setState({ localMessage: errorMessage });
    }
  };

  render() {
    const { data, loading, message } = this.props;
    const { isEditMode, formValues, localMessage, selectedImage } = this.state;
    const displayMessage =
      localMessage ||
      (message && message !== 'User retrieved successfully' ? message : null);
    const isInitialLoading = loading && !data;
    const profileImageUri =
      selectedImage?.uri ??
      data?.profileImage?.imageUrl ??
      formValues.profileImageUrl;

    const profileImageSource = profileImageUri
      ? { uri: profileImageUri }
      : imageProfile1;

    return (
      <View style={styles.mainContainer}>
        <CustomStatusBar />
        <ImageBackground source={HomeScreenPng} style={styles.image}>
          <Header
            heading={isEditMode ? 'Edit Profile' : 'Profile'}
            navigation={this.props.navigation}
            RigthView={
              <View>
                <CustomGButton
                  tittle={isEditMode ? 'Cancel' : 'Edit'}
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(4),
                  }}
                  testID="btnEdit"
                  disabled={loading}
                  onPress={isEditMode ? this.handleCancelEdit : this.enableEdit}
                />
              </View>
            }
          />
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={{ paddingBottom: '10%' }}
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => closeKeyBoard()}
            >
              <KeyboardAvoidingView
                keyboardVerticalOffset={12}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
              >
                <View style={styles.mainView}>
                  {isInitialLoading ? (
                    <ActivityIndicator
                      style={styles.initialLoader}
                      size="large"
                      color={COLORS.white}
                    />
                  ) : null}
                  <Text style={styles.title}>Set up your profile</Text>
                  <Text style={styles.subtitle}>
                    Update your profile to connect your doctor with better
                    impression.
                  </Text>

                  <LinearGradient
                    colors={[COLORS.lightCyan, COLORS.lightYellow]}
                    start={{ x: 0.0, y: 0.5 }}
                    end={{ x: 1.0, y: 0.5 }}
                    style={styles.imageView}
                  >
                    <TouchableOpacity
                      style={[
                        styles.cameraView,
                        !isEditMode && styles.cameraViewDisabled,
                      ]}
                      onPress={this.handlePickImage}
                      activeOpacity={0.7}
                      disabled={!isEditMode}
                    >
                      <VectorIcon
                        name="camera"
                        color={COLORS.white}
                        size={20}
                      />
                    </TouchableOpacity>
                    <Image source={profileImageSource} style={styles.image1} />
                  </LinearGradient>

                  <View style={styles.mainView1}>
                    <Text style={[styles.title, styles.titper]}>
                      Personal information
                    </Text>
                    <CustomTextInput
                      editable={isEditMode}
                      value={formValues.fullName}
                      placeholder="Enter your full name"
                      onChangeText={text =>
                        this.handleInputChange('fullName', text)
                      }
                    />
                    <CustomTextInput
                      editable={isEditMode}
                      value={formValues.phoneNumber}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      onChangeText={text =>
                        this.handleInputChange('phoneNumber', text)
                      }
                    />
                    <CustomTextInput
                      editable={false}
                      value={formValues.userName}
                      placeholder="Username"
                    />
                    <CustomTextInput
                      editable={false}
                      value={formValues.email}
                      placeholder="Email"
                      keyboardType="email-address"
                    />
                    {displayMessage ? (
                      <Text style={styles.statusMessage}>{displayMessage}</Text>
                    ) : null}
                    {isEditMode ? (
                      <View style={styles.actionRow}>
                        <CustomGButton
                          tittle={loading ? 'Saving...' : 'Save changes'}
                          onPress={this.handleSave}
                          disabled={loading}
                        />
                        {loading ? (
                          <ActivityIndicator
                            style={styles.loader}
                            size="small"
                            color={COLORS.white}
                          />
                        ) : null}
                      </View>
                    ) : null}
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.Profile.data,
  loading: state.Profile.loading,
  message: state.Profile.message,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getProfileApi: () => dispatch(getProfileAction()),
  updateProfileApi: (payload: FormData) =>
    dispatch(updateProfileAction(payload)).unwrap(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    flexDirection: 'column',
  },
  title: {
    fontFamily: FONTS.rubik.medium,
    fontSize: responsiveFontSize(2.5),
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: FONTS.rubik.regular,
    fontSize: responsiveFontSize(2),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  imageView: {
    width: responsiveHeight(15),
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(15) / 2,
    marginVertical: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    // zIndex: -1,
  },
  image1: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    borderRadius: responsiveHeight(14) / 2,
    resizeMode: 'cover',
  },
  cameraView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'visible',
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(5) / 2,
    zIndex: 10,
  },
  cameraViewDisabled: {
    opacity: 0.6,
  },
  mainView1: {
    // marginTop: responsiveHeight(3),
    alignItems: 'center',
    width: '100%',
  },
  titper: {
    fontSize: responsiveFontSize(2.4),
    marginVertical: responsiveHeight(2),
  },
  initialLoader: {
    marginBottom: responsiveHeight(2),
  },
  actionRow: {
    width: '100%',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  loader: {
    marginTop: responsiveHeight(1),
  },
  statusMessage: {
    width: '100%',
    color: COLORS.green,
    fontFamily: FONTS.rubik.regular,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
    textAlign: 'left',
  },
});
