import {
  formateDate,
  checkEmailValidation,
  handleOnChange,
  checkNameValidation,
  closeKeyBoard,
  handleScroll,
  navigateTo,
  replaceTo,
  closeDrawer,
  nestedNavigateTo,
} from '../../../src/helper/utilities';

describe('utilities helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('formats dates as DD-MM-YYYY', () => {
    expect(formateDate('2025-01-15')).toBe('15-01-2025');
  });

  it('validates email addresses', () => {
    expect(checkEmailValidation('user@example.com')).toBe(true);
    expect(checkEmailValidation('bad-address')).toBe(false);
  });

  it('resets error field on handleOnChange', () => {
    const nextState = handleOnChange(
      { error: { email: 'Required' } },
      'user@example.com',
      'email',
    );
    expect(nextState.email).toBe('user@example.com');
    expect(nextState.error.email).toBe('');
  });

  it('validates user names', () => {
    expect(checkNameValidation('John Doe')).toBe(true);
    expect(checkNameValidation('John123')).toBe(false);
  });

  it('dismisses the keyboard', () => {
    const dismissSpy = jest.spyOn(require('react-native').Keyboard, 'dismiss');
    closeKeyBoard();
    expect(dismissSpy).toHaveBeenCalled();
  });

  it('returns true when scrolled beyond threshold', () => {
    const event = {
      nativeEvent: { contentOffset: { y: 20 } },
    } as any;
    expect(handleScroll(event)).toBe(true);
  });

  it('navigates and replaces routes safely', () => {
    const navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
      closeDrawer: jest.fn(),
    };

    navigateTo(navigation as any, 'Screen', { id: 1 });
    expect(navigation.navigate).toHaveBeenCalledWith('Screen', { id: 1 });

    replaceTo(navigation as any, 'Other', { ok: true });
    expect(navigation.replace).toHaveBeenCalledWith('Other', { ok: true });

    closeDrawer(navigation as any);
    expect(navigation.closeDrawer).toHaveBeenCalled();
  });

  it('navigates nested routes', () => {
    const navigation = { navigate: jest.fn() };
    nestedNavigateTo(navigation as any, ['Child', 'GrandChild'], 'Parent', {
      id: 42,
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Parent', {
      screen: 'Child',
      params: { screen: 'GrandChild', params: { id: 42 } },
    });
  });

  it('handles missing navigation references gracefully', () => {
    expect(() => navigateTo(undefined, 'Screen')).not.toThrow();
    expect(() => replaceTo(undefined, 'Screen')).not.toThrow();
    expect(() => closeDrawer(undefined)).not.toThrow();
    expect(() =>
      nestedNavigateTo(undefined, ['Child'], 'Parent', {}),
    ).not.toThrow();
  });
});
