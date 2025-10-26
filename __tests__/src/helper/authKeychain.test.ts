describe('authKeychain bootstrap', () => {
  const KEY = '@doctor_app/auth/keychainBootstrapped';

  const setup = async (bootstrapped: boolean) => {
    const storageMock = {
      getItem: jest.fn().mockResolvedValue(bootstrapped ? 'true' : null),
      setItem: jest.fn().mockResolvedValue(undefined),
      removeItem: jest.fn().mockResolvedValue(undefined),
    };

    const keychainMock = {
      setGenericPassword: jest.fn().mockResolvedValue(undefined),
      getGenericPassword: jest.fn().mockResolvedValue(null),
      resetGenericPassword: jest.fn().mockResolvedValue(undefined),
    };

    jest.doMock('../../../src/helper/Storage', () => storageMock);
    jest.doMock('react-native-keychain', () => keychainMock);

    let importedModule: typeof import('../../../src/helper/authKeychain');
    jest.isolateModules(() => {
      importedModule = require('../../../src/helper/authKeychain');
    });

    jest.dontMock('../../../src/helper/Storage');
    jest.dontMock('react-native-keychain');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { module: importedModule!, storageMock, keychainMock };
  };

  it('resets the keychain and sets bootstrap flag on first run', async () => {
    const { module, storageMock, keychainMock } = await setup(false);

    await module.storeAuthToken('token-123');

    expect(keychainMock.resetGenericPassword).toHaveBeenCalledTimes(1);
    expect(storageMock.setItem).toHaveBeenCalledWith(KEY, 'true');
    expect(keychainMock.setGenericPassword).toHaveBeenCalledWith(
      'auth',
      'token-123',
    );
  });

  it('does not reset keychain when already bootstrapped', async () => {
    const { module, keychainMock } = await setup(true);

    await module.storeAuthToken('persistent-token');

    expect(keychainMock.resetGenericPassword).not.toHaveBeenCalled();
  });

  it('returns stored password and marks bootstrap flag', async () => {
    const { module, storageMock, keychainMock } = await setup(false);
    keychainMock.getGenericPassword.mockResolvedValueOnce({
      password: 'persisted',
    });

    await expect(module.getStoredAuthToken()).resolves.toBe('persisted');
    expect(storageMock.setItem).toHaveBeenCalledWith(KEY, 'true');
  });
});
