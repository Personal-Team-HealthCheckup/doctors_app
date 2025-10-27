const REDUX_PERSIST_EXPORTS = {
  FLUSH: 'FLUSH',
  REHYDRATE: 'REHYDRATE',
  PAUSE: 'PAUSE',
  PERSIST: 'PERSIST',
  PURGE: 'PURGE',
  REGISTER: 'REGISTER',
};

describe('redux store configuration', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalDev = (global as any).__DEV__;

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.NODE_ENV = originalEnv;
    (global as any).__DEV__ = originalDev;
    delete (console as any).tron;
  });

  const createReduxPersistMock = () => {
    const persistReducer = jest
      .fn()
      .mockImplementation((_config, reducer) => reducer);
    const fakePersistor = {
      subscribe: jest.fn().mockReturnValue(jest.fn()),
      getState: jest.fn(() => ({ bootstrapped: false })),
    };
    const persistStore = jest.fn(() => fakePersistor);

    jest.doMock('redux-persist', () => ({
      ...REDUX_PERSIST_EXPORTS,
      persistReducer,
      persistStore,
    }));

    return { persistReducer, persistStore, fakePersistor };
  };

  it('creates a persisted store with expected configuration', () => {
    jest.resetModules();
    const { persistReducer, persistStore, fakePersistor } =
      createReduxPersistMock();

    let storeModule: typeof import('../../../src/redux/store');
    jest.isolateModules(() => {
      storeModule = require('../../../src/redux/store');
    });

    const { store, persistor } = storeModule!;

    expect(persistReducer).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'root',
        whitelist: ['Auth'],
        blacklist: ['Auth.loading', 'Auth.error', 'Auth.message'],
      }),
      expect.any(Function),
    );
    expect(persistStore).toHaveBeenCalledWith(store);
    expect(persistor).toBe(fakePersistor);

    const action = { type: 'unknown/action' };
    expect(store.dispatch(action)).toEqual(action);
    expect(store.getState()).toHaveProperty('Auth');
  });

  it('subscribes to persistor and logs snapshot in dev mode', () => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';
    (global as any).__DEV__ = true;

    const callbackRef: { current?: () => void } = {};
    const persistReducer = jest
      .fn()
      .mockImplementation((_config, reducer) => reducer);
    const fakePersistor = {
      subscribe: jest.fn(cb => {
        callbackRef.current = cb;
        return jest.fn();
      }),
      getState: jest.fn(() => ({ bootstrapped: true })),
    };
    const persistStore = jest.fn(() => fakePersistor);

    jest.doMock('redux-persist', () => ({
      ...REDUX_PERSIST_EXPORTS,
      persistReducer,
      persistStore,
    }));

    const consoleDisplay = jest.fn();
    (console as any).tron = { display: consoleDisplay };

    let storeModule: typeof import('../../../src/redux/store');
    jest.isolateModules(() => {
      storeModule = require('../../../src/redux/store');
    });

    expect(fakePersistor.subscribe).toHaveBeenCalledTimes(1);
    expect(callbackRef.current).toBeInstanceOf(Function);

    callbackRef.current?.();

    const snapshot = storeModule!.store.getState();
    expect(consoleDisplay).toHaveBeenCalledWith({
      name: 'PERSISTOR_STATE',
      preview: 'bootstrapped: true',
      value: { bootstrapped: true, snapshot },
    });
  });
});
