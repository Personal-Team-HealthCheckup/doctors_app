import React from 'react';
import SplashScreens from '../../../src/screen/Splashscreen';
import { MAINSTACK } from '../../../src/Constants/Navigator';
import { getStoredAuthToken } from '../../../src/helper/authKeychain';
import CustomLoader from '../../../src/Components/CustomLoader';
import { View } from 'react-native';

jest.mock('../../../src/helper/authKeychain', () => ({
  getStoredAuthToken: jest.fn(),
}));

jest.mock('../../../src/helper/i18', () => ({
  translate: (key: string) => key,
}));

describe('SplashScreens navigation', () => {
  const navigation = { replace: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const setStateSync = (component: any) => {
    component.setState = (update: any) => {
      const value =
        typeof update === 'function'
          ? update(component.state, component.props)
          : update;
      component.state = { ...component.state, ...value };
    };
  };

  it('navigates to home when token exists', async () => {
    (getStoredAuthToken as jest.Mock).mockResolvedValueOnce('token');
    const component = new SplashScreens({ navigation });
    await component['handleNavigation']();
    expect(navigation.replace).toHaveBeenCalledWith(MAINSTACK.HOMENAVIGATION);
  });

  it('navigates to auth flow when token missing', async () => {
    (getStoredAuthToken as jest.Mock).mockResolvedValueOnce(null);
    const component = new SplashScreens({ navigation });
    await component['handleNavigation']();
    expect(navigation.replace).toHaveBeenCalledWith(MAINSTACK.AUTHNAVIGATION);
  });

  it('registers and clears timeouts correctly', () => {
    const component = new SplashScreens({ navigation });
    component.componentDidMount();
    expect(component['timers'].length).toBe(3);
    component.componentWillUnmount();
    expect(component['timers']).toHaveLength(0);
  });

  it('renders loader and check screens based on state', () => {
    const component = new SplashScreens({ navigation });
    setStateSync(component);

    component.setState({ firstTime: 'loading' });
    const loadingTree = component.render() as React.ReactElement;
    expect(loadingTree.type).toBe(CustomLoader);

    component.setState({ firstTime: 'Check' });
    const checkTree = component.render() as React.ReactElement;
    expect(checkTree.type).toBe(View);

    component.setState({ firstTime: 'splashScreen' });
    const defaultTree = component.render() as React.ReactElement;
    expect(defaultTree.type).toBe(React.Fragment);
  });

  it('advances through timers and triggers navigation', () => {
    jest.useFakeTimers();
    const component = new SplashScreens({ navigation });
    const navSpy = jest
      .spyOn(component as any, 'handleNavigation')
      .mockResolvedValue(undefined);
    component.componentDidMount();

    jest.advanceTimersByTime(1000);
    expect(component.state.firstTime).toBe('splashScreen');

    jest.advanceTimersByTime(1000);
    expect(component.state.firstTime).toBe('splashScreen');

    jest.runOnlyPendingTimers();
    expect(navSpy).toHaveBeenCalled();

    component.componentWillUnmount();
    jest.useRealTimers();
  });
});
