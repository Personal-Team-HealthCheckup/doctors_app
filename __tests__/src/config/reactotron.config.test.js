describe('reactotron config', () => {
  beforeEach(() => {
    const { reactotronRedux } = require('reactotron-redux');
    reactotronRedux.mockClear();
    if (reactotronRedux.configs) {
      reactotronRedux.configs.length = 0;
    }
  });

  it('initializes reactotron with redux plugin hooks', () => {
    const { reactotronRedux } = require('reactotron-redux');
    jest.isolateModules(() => {
      jest.unmock('../../../src/config/reactotron.config');
      const configModule = jest.requireActual(
        '../../../src/config/reactotron.config',
      );
      expect(configModule.default).toBeDefined();
    });

    expect(reactotronRedux).toHaveBeenCalled();
    const pluginConfig = reactotronRedux.mock.calls.slice(-1)[0][0];

    const action = { type: 'persist/REHYDRATE' };
    pluginConfig.onDispatch(action);
    pluginConfig.onRestore({ restored: true });

    const reactotronModule = require('reactotron-react-native');
    expect(reactotronModule.display).toHaveBeenCalled();

    expect(pluginConfig.isActionImportant(action)).toBe(true);
    expect(pluginConfig.isActionImportant({ type: 'OTHER' })).toBe(false);
  });
});
