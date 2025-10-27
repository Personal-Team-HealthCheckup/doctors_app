import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  formateDate,
  checkEmailValidation,
  handleOnChange,
  checkNameValidation,
  closeKeyBoard,
  handleScroll,
  setStorageData,
  getStorageData,
  removeStorageData,
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

  it('stores and retrieves encrypted data', async () => {
    const value = { token: 'abc123' };
    await setStorageData('auth', value);
    expect(AsyncStorage.setItem).toHaveBeenCalled();

    const [, encrypted] = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(encrypted as string);

    const stored = await getStorageData('auth', true);
    expect(stored).toEqual(value);
  });

  it('returns decrypted string when parseToJson is false', async () => {
    const value = { foo: 'bar' };
    await setStorageData('raw', value);
    const [, encrypted] = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      encrypted as string,
    );

    const stored = await getStorageData('raw');
    expect(stored).toBe(JSON.stringify(value));
  });

  it('removes stored data', async () => {
    await removeStorageData('key');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('key');
  });

  it('skips storage operations when key is missing', async () => {
    await setStorageData('', { foo: 'bar' });
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();

    await removeStorageData('');
    expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
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

  it('returns null when getStorageData has no key stored', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    await expect(getStorageData('missing')).resolves.toBeNull();
  });

  it('handles storage errors gracefully', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
      new Error('failed'),
    );
    await expect(setStorageData('auth', { foo: 'bar' })).rejects.toThrow(
      'failed',
    );
  });

  it('handleScroll respects the threshold boundary', () => {
    const event = {
      nativeEvent: { contentOffset: { y: 5 } },
    } as any;
    expect(handleScroll(event)).toBe(false);
  });
});
