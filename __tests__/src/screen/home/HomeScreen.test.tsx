import HomeScreenConnected from '../../../../src/screen/home/HomeScreen';
import { DASHBOARD } from '../../../../src/Constants/Navigator';
import { navigateTo } from '../../../../src/helper/utilities';

jest.mock('../../../../src/helper/utilities', () => ({
  navigateTo: jest.fn(),
  closeDrawer: jest.fn(),
}));

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

  const createInstance = () => {
    const navigation = createNavigation();
    const props = {
      navigation,
      authData: createAuthData(),
    };

    const instance = new HomeScreen(props as any);

    instance.setState = (update: any) => {
      const partial =
        typeof update === 'function' ? update(instance.state, props) : update;
      instance.state = { ...instance.state, ...partial };
    };

    return { instance, navigation, props };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to appointment selection', () => {
    const { instance, navigation } = createInstance();
    instance.navigateToAppointments();
    expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD.SELECTTIME);
  });

  it('toggles favourite flag for a doctor', () => {
    const { instance } = createInstance();
    const doctorId = instance.state.qualifiedDoctor[0].id;
    const initial = instance.state.qualifiedDoctor[0].isFaveritiated;

    instance.toggleFaverite(doctorId);

    const updated = instance.state.qualifiedDoctor.find(
      doctor => doctor.id === doctorId,
    );
    expect(updated?.isFaveritiated).toBe(!initial);
  });

  it('invokes navigateTo helper when doctor card is pressed', () => {
    const { instance, navigation } = createInstance();
    const doctor = instance.state.qualifiedDoctor[0];

    const card = instance.renderQualifiedDoctor({ item: doctor, index: 0 });
    card.props.onPress();

    expect(navigateTo).toHaveBeenCalledWith(navigation, DASHBOARD.DOCTORDETAILS, {
      doctorId: doctor.id,
    });
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
    const clearSpy = jest.spyOn(global, 'clearTimeout');

    instance.componentDidMount();
    instance.componentWillUnmount();

    expect(clearSpy).toHaveBeenCalledWith(instance.timer);
    clearSpy.mockRestore();
    jest.useRealTimers();
  });
});
