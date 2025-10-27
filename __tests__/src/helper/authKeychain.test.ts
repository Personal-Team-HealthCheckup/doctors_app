describe('authKeychain bootstrap', () => {
  const KEY = '@doctor_app/auth/keychainBootstrapped';

  type SetupOptions = {
    bootstrapped?: boolean;
    storageOverrides?: Partial<Record<string, jest.Mock>>;
    keychainOverrides?: Partial<Record<string, jest.Mock>>;
  };

  const setup = async ({
    bootstrapped = false,
    storageOverrides = {},
    keychainOverrides = {},
  }: SetupOptions = {}) => {
    jest.resetModules();

    const storageMock = {
      getItem: jest.fn().mockResolvedValue(bootstrapped ? 'true' : null),
      setItem: jest.fn().mockResolvedValue(undefined),
      removeItem: jest.fn().mockResolvedValue(undefined),
      ...storageOverrides,
    };

    const keychainMock = {
      setGenericPassword: jest.fn().mockResolvedValue(undefined),
      getGenericPassword: jest.fn().mockResolvedValue(null),
      resetGenericPassword: jest.fn().mockResolvedValue(undefined),
      ...keychainOverrides,
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

  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  afterEach(() => {
    warnSpy.mockClear();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('resets the keychain and sets bootstrap flag on first run', async () => {
    const { module, storageMock, keychainMock } = await setup({
      bootstrapped: false,
    });

    await module.storeAuthToken('token-123');

    expect(keychainMock.resetGenericPassword).toHaveBeenCalledTimes(1);
    expect(storageMock.setItem).toHaveBeenCalledWith(KEY, 'true');
    expect(keychainMock.setGenericPassword).toHaveBeenCalledWith(
      'auth',
      'token-123',
    );
  });

  it('does not reset keychain when already bootstrapped', async () => {
    const { module, keychainMock } = await setup({ bootstrapped: true });

    await module.storeAuthToken('persistent-token');

    expect(keychainMock.resetGenericPassword).not.toHaveBeenCalled();
  });

  it('returns stored password and marks bootstrap flag', async () => {
    const { module, storageMock, keychainMock } = await setup({
      bootstrapped: false,
    });
    keychainMock.getGenericPassword.mockResolvedValueOnce({
      password: 'persisted',
    });

    await expect(module.getStoredAuthToken()).resolves.toBe('persisted');
    expect(storageMock.setItem).toHaveBeenCalledWith(KEY, 'true');
  });

  it('skips storing token when falsy value provided', async () => {
    const { module, keychainMock, storageMock } = await setup({
      bootstrapped: true,
    });

    await module.storeAuthToken(null as any);

    expect(keychainMock.setGenericPassword).not.toHaveBeenCalled();
    expect(storageMock.getItem).not.toHaveBeenCalled();
  });

  it('warns when marking bootstrapped flag fails', async () => {
    const { module, storageMock, keychainMock } = await setup({
      bootstrapped: false,
    });
    storageMock.setItem.mockRejectedValueOnce(new Error('mark failed'));

    await module.storeAuthToken('token-123');

    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to mark auth keychain bootstrapped',
      expect.any(Error),
    );
    expect(keychainMock.setGenericPassword).toHaveBeenCalledWith(
      'auth',
      'token-123',
    );
  });

  it('warns when reading bootstrap flag fails', async () => {
    const { module, storageMock } = await setup({
      storageOverrides: {
        getItem: jest.fn().mockRejectedValue(new Error('get failed')),
      },
    });

    await expect(module.getStoredAuthToken()).resolves.toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to ensure auth keychain bootstrapped',
      expect.any(Error),
    );
  });

  it('warns when storing token fails', async () => {
    const { module, keychainMock } = await setup({
      bootstrapped: true,
    });
    keychainMock.setGenericPassword.mockRejectedValueOnce(
      new Error('store fail'),
    );

    await module.storeAuthToken('token');

    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to store token in keychain',
      expect.any(Error),
    );
  });

  it('returns null when loading token fails', async () => {
    const { module, keychainMock } = await setup({
      bootstrapped: true,
    });
    keychainMock.getGenericPassword.mockRejectedValueOnce(
      new Error('load fail'),
    );

    await expect(module.getStoredAuthToken()).resolves.toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to load token from keychain',
      expect.any(Error),
    );
  });

  it('warns when clearing stored token fails', async () => {
    const { module, keychainMock } = await setup({
      bootstrapped: true,
    });
    keychainMock.resetGenericPassword.mockRejectedValueOnce(
      new Error('clear fail'),
    );

    await module.clearStoredAuthToken();

    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to clear token from keychain',
      expect.any(Error),
    );
  });
});
