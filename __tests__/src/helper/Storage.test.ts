import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../src/helper/Storage';

const asyncStorageMock = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Storage helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when nothing is stored', async () => {
    asyncStorageMock.getItem.mockResolvedValueOnce(null);

    await expect(Storage.getItem('missing')).resolves.toBeNull();
    expect(asyncStorageMock.getItem).toHaveBeenCalledWith('missing');
  });

  it('encrypts on set and decrypts on get', async () => {
    const payload = { token: 'secure' };
    await Storage.setItem('auth', payload);

    expect(asyncStorageMock.setItem).toHaveBeenCalledTimes(1);
    const [key, storedValue] = asyncStorageMock.setItem.mock.calls[0];
    expect(key).toBe('auth');
    expect(typeof storedValue).toBe('string');
    expect(storedValue).not.toContain('secure');

    asyncStorageMock.getItem.mockResolvedValueOnce(storedValue as string);
    await expect(Storage.getItem('auth')).resolves.toBe(JSON.stringify(payload));
  });

  it('removes the key when asked to store undefined', async () => {
    await Storage.setItem('transient', undefined);

    expect(asyncStorageMock.removeItem).toHaveBeenCalledWith('transient');
    expect(asyncStorageMock.setItem).not.toHaveBeenCalled();
  });
});
