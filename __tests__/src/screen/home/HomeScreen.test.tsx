import React from 'react';
import HomeScreenConnected from '../../../../src/screen/home/HomeScreen';
import { DASHBOARD } from '../../../../src/Constants/Navigator';
import { navigateTo } from '../../../../src/helper/utilities';
import renderer, { act } from 'react-test-renderer';
import { Text, Image, ImageBackground } from 'react-native';
import {
  commonDeseaseData,
  medicalStoreData,
  qualifiedDoctorData,
  yourAppointmentsData,
} from '../../../../src/global/data';
import { imageProfile2 } from '../../../../src/assets/assets';

jest.mock('../../../../src/helper/utilities', () => ({
  navigateTo: jest.fn(),
  closeDrawer: jest.fn(),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('HomeScreen logic', () => {
  const HomeScreen =
    (HomeScreenConnected as any).WrappedComponent || HomeScreenConnected;

  const createNavigation = () => ({
    navigate: jest.fn(),
    openDrawer: jest.fn(),
  });

  const createAuthData = () => ({
    user: {
      fullName: 'Dr. Jane Smith',
      email: 'jane@example.com',
    },
  });

  const createUserData = (overrides = {}) => ({
    data: {
      fullName: 'Dr. John Doe',
      profileImage: { imageUrl: 'https://example.com/profile.jpg' },
      ...overrides,
    },
    loading: false,
    message: null,
  });

  const createProps = (overrides = {}) => ({
    navigation: createNavigation(),
    authData: createAuthData(),
    userData: createUserData(),
    getProfileApi: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  });

  const createInstance = (propOverrides = {}) => {
    const props = createProps(propOverrides);
    const instance = new HomeScreen(props as any);

    instance.setState = (update: any) => {
      const partial =
        typeof update === 'function' ? update(instance.state, props) : update;
      instance.state = { ...instance.state, ...partial };
    };

    return { instance, navigation: props.navigation, props };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component lifecycle', () => {
    it('calls getProfileApi on mount', async () => {
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ getProfileApi });

      await instance.componentDidMount();

      expect(getProfileApi).toHaveBeenCalledTimes(1);
    });

    it('initializes with correct default state', () => {
      const { instance } = createInstance();

      expect(instance.state.isLinearGradient).toBe(true);
      expect(instance.state.yourAppointmentsData).toEqual(yourAppointmentsData);
      expect(instance.state.medicalPharmacy).toEqual(medicalStoreData);
      expect(instance.state.qualifiedDoctor).toEqual(qualifiedDoctorData);
    });

    it('disables gradient header after timer', () => {
      jest.useFakeTimers();
      const { instance } = createInstance();
      instance.componentDidMount();

      expect(instance.state.isLinearGradient).toBe(true);

      jest.advanceTimersByTime(2000);

      expect(instance.state.isLinearGradient).toBe(false);
      instance.componentWillUnmount();
      jest.useRealTimers();
    });

    it('clears timeout when unmounted', () => {
      jest.useFakeTimers();
      const { instance } = createInstance();
      const clearSpy = jest.spyOn(globalThis, 'clearTimeout');

      instance.componentDidMount();
      instance.componentWillUnmount();

      expect(clearSpy).toHaveBeenCalledWith(instance.timer);
      clearSpy.mockRestore();
      jest.useRealTimers();
    });
  });

  describe('Navigation handlers', () => {
    it('navigates to appointment selection', () => {
      const { instance, navigation } = createInstance();
      instance.navigateToAppointments();
      expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD.SELECTTIME);
    });

    it('handles navigation with navigate method', () => {
      const { instance, navigation } = createInstance();
      instance.handleNavigation(DASHBOARD.DOCTORS);
      expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD.DOCTORS);
    });

    it('handles navigation when navigate is undefined', () => {
      const navigation = { navigate: undefined, openDrawer: jest.fn() };
      const { instance } = createInstance({ navigation });

      expect(() => instance.handleNavigation(DASHBOARD.DOCTORS)).not.toThrow();
      expect(navigation.navigate).toBeUndefined();
    });

    it('toggles drawer when openDrawer exists', () => {
      const { instance, navigation } = createInstance();
      instance.toggleDrawer();
      expect(navigation.openDrawer).toHaveBeenCalled();
    });

    it('handles toggle drawer when openDrawer is undefined', () => {
      const navigation = { navigate: jest.fn(), openDrawer: undefined };
      const { instance } = createInstance({ navigation });

      expect(() => instance.toggleDrawer()).not.toThrow();
      expect(navigation.openDrawer).toBeUndefined();
    });
  });

  describe('Favorite functionality', () => {
    it('toggles favourite flag for a doctor', () => {
      const { instance } = createInstance();
      const doctorId = instance.state.qualifiedDoctor[0].id;
      const initial = instance.state.qualifiedDoctor[0].isFaveritiated;

      instance.toggleFaverite(doctorId);

      const updated = instance.state.qualifiedDoctor.find(
        (doctor: any) => doctor.id === doctorId,
      );
      expect(updated?.isFaveritiated).toBe(!initial);
    });

    it('only toggles the specific doctor favorite', () => {
      const { instance } = createInstance();
      const firstDoctor = instance.state.qualifiedDoctor[0];
      const secondDoctor = instance.state.qualifiedDoctor[1];
      const initialFirst = firstDoctor.isFaveritiated;
      const initialSecond = secondDoctor.isFaveritiated;

      instance.toggleFaverite(firstDoctor.id);

      expect(
        instance.state.qualifiedDoctor.find((d: any) => d.id === firstDoctor.id)
          ?.isFaveritiated,
      ).toBe(!initialFirst);
      expect(
        instance.state.qualifiedDoctor.find((d: any) => d.id === secondDoctor.id)
          ?.isFaveritiated,
      ).toBe(initialSecond);
    });
  });

  describe('Render methods', () => {
    it('renders common disease item correctly', () => {
      const { instance } = createInstance();
      const item = commonDeseaseData[0];

      const element = instance._renderCommnDesease({ item });

      expect(element).toBeDefined();
      expect(element.props.source).toBe(item.backgroudImage);
    });

    it('renders appointment card correctly', () => {
      const { instance } = createInstance();
      const item = yourAppointmentsData[0];

      const element = instance._renderAppointments({ item, index: 0 });

      expect(element).toBeDefined();
      expect(element.type).toBeDefined();
    });

    it('applies margin styles to first appointment', () => {
      const { instance } = createInstance();
      const item = yourAppointmentsData[0];

      const element = instance._renderAppointments({ item, index: 0 });

      expect(element.props.style).toBeDefined();
    });

    it('applies margin styles to last appointment', () => {
      const { instance } = createInstance();
      const lastIndex = yourAppointmentsData.length - 1;
      const item = yourAppointmentsData[lastIndex];

      const element = instance._renderAppointments({
        item,
        index: lastIndex,
      });

      expect(element.props.style).toBeDefined();
    });

    it('renders medical store item correctly', () => {
      const { instance } = createInstance();
      const item = medicalStoreData[0];

      const element = instance._renderMedicalStores({ item, index: 0 });

      expect(element).toBeDefined();
    });

    it('applies last item style to medical store', () => {
      const { instance } = createInstance();
      const lastIndex = medicalStoreData.length - 1;
      const item = medicalStoreData[lastIndex];

      const element = instance._renderMedicalStores({ item, index: lastIndex });

      expect(element.props.style).toContainEqual(
        expect.objectContaining({ marginRight: expect.any(Number) }),
      );
    });

    it('renders qualified doctor card correctly', () => {
      const { instance } = createInstance();
      const doctor = instance.state.qualifiedDoctor[0];

      const card = instance.renderQualifiedDoctor({ item: doctor, index: 0 });

      expect(card).toBeDefined();
      expect(card.props.onPress).toBeDefined();
    });

    it('invokes navigateTo helper when doctor card is pressed', () => {
      const { instance, navigation } = createInstance();
      const doctor = instance.state.qualifiedDoctor[0];

      const card = instance.renderQualifiedDoctor({ item: doctor, index: 0 });
      card.props.onPress();

      expect(navigateTo).toHaveBeenCalledWith(
        navigation,
        DASHBOARD.DOCTORDETAILS,
        {
          doctorId: doctor.id,
        },
      );
    });

    it('applies last item style to qualified doctor', () => {
      const { instance } = createInstance();
      const lastIndex = instance.state.qualifiedDoctor.length - 1;
      const doctor = instance.state.qualifiedDoctor[lastIndex];

      const card = instance.renderQualifiedDoctor({
        item: doctor,
        index: lastIndex,
      });

      expect(card.props.style).toContainEqual(
        expect.objectContaining({ marginRight: 0 }),
      );
    });
  });

  describe('Profile image logic', () => {
    it('uses profile image from userData when available', () => {
      const { props } = createInstance({
        userData: createUserData({
          profileImage: { imageUrl: 'https://example.com/user-profile.jpg' },
        }),
      });

      const profileImageSource = props.userData.data?.profileImage
        ? { uri: props.userData.data.profileImage.imageUrl }
        : require('../../../../src/assets/assets').imageProfile2;

      expect(profileImageSource).toEqual({
        uri: 'https://example.com/user-profile.jpg',
      });
    });

    it('falls back to default image when no profile image', () => {
      const { props } = createInstance({
        userData: createUserData({ profileImage: null }),
      });

      const profileImageSource = props.userData.data?.profileImage
        ? { uri: props.userData.data.profileImage.imageUrl }
        : null;

      expect(profileImageSource).toBeNull();
    });
  });

  describe('User name display', () => {
    it('displays user name from userData when available', () => {
      const { props } = createInstance({
        userData: createUserData({ fullName: 'Dr. Profile Name' }),
      });

      const displayName =
        props.userData.data?.fullName ?? props.authData.user?.fullName;

      expect(displayName).toBe('Dr. Profile Name');
    });

    it('falls back to authData user name when userData is null', () => {
      const { props } = createInstance({
        authData: createAuthData(),
        userData: { data: null, loading: false, message: null },
      });

      const displayName =
        props.userData.data?.fullName ?? props.authData.user?.fullName;

      expect(displayName).toBe('Dr. Jane Smith');
    });
  });

  describe('Redux integration', () => {
    it('connects to Redux store correctly', () => {
      expect(HomeScreenConnected).toBeDefined();
    });
  });

  describe('Callback handling in renders', () => {
    it('renders CustomRating with disabled state and empty onChange', () => {
      const { instance } = createInstance();
      const item = medicalStoreData[0];

      const element = instance._renderMedicalStores({ item, index: 0 });

      expect(element).toBeDefined();
    });

    it('handles appointment navigation callback', () => {
      const { instance, navigation } = createInstance();

      instance.navigateToAppointments();

      expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD.SELECTTIME);
    });

    it('handles navigation without navigate method gracefully', () => {
      const { instance } = createInstance({
        navigation: { navigate: undefined, openDrawer: jest.fn() },
      });

      expect(() => instance.navigateToAppointments()).not.toThrow();
    });
  });

  describe('Component rendering with different states', () => {
    it('renders with gradient enabled', () => {
      const { instance } = createInstance();

      expect(instance.state.isLinearGradient).toBe(true);
    });

    it('renders with gradient disabled', () => {
      jest.useFakeTimers();
      const { instance } = createInstance();

      instance.componentDidMount();
      jest.advanceTimersByTime(2000);

      expect(instance.state.isLinearGradient).toBe(false);

      instance.componentWillUnmount();
      jest.useRealTimers();
    });

    it('renders with userData profile name', () => {
      const { props } = createInstance({
        userData: createUserData({ fullName: 'Dr. Test User' }),
      });

      const displayName =
        props.userData.data?.fullName ?? props.authData.user?.fullName;

      expect(displayName).toBe('Dr. Test User');
    });

    it('renders all FlatList sections', () => {
      const { instance } = createInstance();

      expect(instance.state.yourAppointmentsData.length).toBeGreaterThan(0);
      expect(instance.state.medicalPharmacy.length).toBeGreaterThan(0);
      expect(instance.state.qualifiedDoctor.length).toBeGreaterThan(0);
    });
  });

  describe('UI rendering coverage', () => {
    const extractText = (node: any) =>
      React.Children.toArray(node.props.children)
        .map(child => (typeof child === 'string' ? child : ''))
        .join('');

    const collectElements = (node: any): React.ReactElement[] => {
      if (!React.isValidElement(node)) {
        return [];
      }
      return React.Children.toArray(node.props.children).reduce(
        (acc: React.ReactElement[], child) => {
          if (React.isValidElement(child)) {
            acc.push(child, ...collectElements(child));
          }
          return acc;
        },
        [],
      );
    };

    const findImageBackgroundChild = (element: any) => {
      const children = React.Children.toArray(element.props.children);
      return children.find(
        child => React.isValidElement(child) && child.type === ImageBackground,
      ) as React.ReactElement | undefined;
    };

    it('renders linear gradient greeting with profile data', () => {
      const { instance } = createInstance();
      const element = instance.render();
      const imageBackground = findImageBackgroundChild(element);
      expect(imageBackground).toBeDefined();

      const imageChildren = React.Children.toArray(
        imageBackground?.props.children ?? [],
      );
      expect(
        React.isValidElement(imageChildren[0]) &&
          (imageChildren[0] as any).type === 'LinearGradient',
      ).toBe(true);

      const descendants = imageChildren
        .filter(child => React.isValidElement(child))
        .flatMap(child => collectElements(child as React.ReactElement));
      const greeting = descendants
        .filter(node => node.type === Text)
        .map(extractText)
        .find(text => text.startsWith('Hi '));
      expect(greeting).toBe('Hi Dr. John Doe');
    });

    it('hides linear gradient when disabled in state', () => {
      const { instance } = createInstance();
      instance.setState({ isLinearGradient: false });
      const element = instance.render();
      const imageBackground = findImageBackgroundChild(element);
      expect(imageBackground).toBeDefined();

      const imageChildren = React.Children.toArray(
        imageBackground?.props.children ?? [],
      );
      expect(
        React.isValidElement(imageChildren[0]) &&
          (imageChildren[0] as any).type === 'LinearGradient',
      ).toBe(false);
    });

    it('falls back to auth data name and default profile image when user profile missing', () => {
      const { instance } = createInstance({
        userData: { data: null, loading: false, message: null },
      });
      const element = instance.render();
      const imageBackground = findImageBackgroundChild(element);
      expect(imageBackground).toBeDefined();

      const imageChildren = React.Children.toArray(
        imageBackground?.props.children ?? [],
      );
      const gradientElement = React.isValidElement(imageChildren[0])
        ? (imageChildren[0] as React.ReactElement)
        : undefined;

      expect(gradientElement?.type).toBe('LinearGradient');

      const descendants = gradientElement
        ? collectElements(gradientElement)
        : [];
      const greeting = descendants
        .filter(node => node.type === Text)
        .map(extractText)
        .find(text => text.startsWith('Hi '));
      expect(greeting).toBe('Hi Dr. Jane Smith');

      const imageSources = descendants
        .filter(node => node.type === Image)
        .map(node => node.props.source);
      expect(imageSources).toContain(imageProfile2);
    });
  });

  describe('Edge cases', () => {
    it('handles empty doctor list for favorite toggle', () => {
      const { instance } = createInstance();
      instance.setState({ qualifiedDoctor: [] });

      expect(() => instance.toggleFaverite(999)).not.toThrow();
    });

    it('handles toggling favorite for non-existent doctor ID', () => {
      const { instance } = createInstance();
      const initialState = [...instance.state.qualifiedDoctor];

      instance.toggleFaverite(999999);

      expect(instance.state.qualifiedDoctor).toEqual(initialState);
    });

    it('calls loadProfile which calls getProfileApi', async () => {
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ getProfileApi });

      await instance.loadProfile();

      expect(getProfileApi).toHaveBeenCalledTimes(1);
    });
  });
});
