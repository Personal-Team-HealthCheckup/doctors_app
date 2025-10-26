import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = '10.129.124.247'; // ⚠️ Replace with your machine IP if using a real device

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'doctor_app',
    // host, // ✅ uncomment this if running on a real device
  })
  .useReactNative({
    asyncStorage: true,
    networking: { ignoreUrls: /symbolicate/ },
    editor: false,
    errors: true,
    overlay: false,
  })
  // .use(stateResponse())
  .use(
    reactotronRedux({
      onRestore: persistedState => {
        Reactotron.display({
          name: 'PERSIST_RESTORE',
          value: persistedState,
          preview: 'redux-persist rehydrated',
        });
        return persistedState;
      },
      onDispatch: action => {
        Reactotron.display({
          name: 'REDUX_ACTION',
          value: action,
          preview: action.type,
        });
      },
      isActionImportant: action =>
        action.type?.startsWith?.('persist/') ||
        action.type === 'persist/REHYDRATE',
    }),
  )
  .use(trackGlobalErrors()) // intercept global errors
  .connect();

if (__DEV__) {
  reactotron.clear();
  console.tron = reactotron;
}

// ✅ Add this manually so your store can access the enhancer

export default reactotron;
