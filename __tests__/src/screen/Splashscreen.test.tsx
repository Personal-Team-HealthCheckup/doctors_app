import SplashScreens from '../../../src/screen/Splashscreen';
import { MAINSTACK } from '../../../src/Constants/Navigator';
import { getStoredAuthToken } from '../../../src/helper/authKeychain';

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

  it('navigates to home when token exists', async () => {
    (getStoredAuthToken as jest.Mock).mockResolvedValueOnce('token');
    const component = new SplashScreens({ navigation });
    await component['handleNavigation']();
    expect(navigation.replace).toHaveBeenCalledWith(
      MAINSTACK.HOMENAVIGATION,
    );
  });

  it('navigates to auth flow when token missing', async () => {
    (getStoredAuthToken as jest.Mock).mockResolvedValueOnce(null);
    const component = new SplashScreens({ navigation });
    await component['handleNavigation']();
    expect(navigation.replace).toHaveBeenCalledWith(
      MAINSTACK.AUTHNAVIGATION,
    );
  });

  it('registers and clears timeouts correctly', () => {
    const component = new SplashScreens({ navigation });
    component.componentDidMount();
    expect(component['timers'].length).toBe(3);
    component.componentWillUnmount();
    expect(component['timers']).toHaveLength(0);
  });
});
