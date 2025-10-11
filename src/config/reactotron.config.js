import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = '10.129.124.247'; // ⚠️ Replace with your machine IP

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Doctor App',
    host,
    port: 4000,
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: true,
    overlay: false,
  })
  .use(
    reactotronRedux({
      isActionImportant: action =>
        action.type.includes('ERROR') || action.type.includes('SUCCESS'),
    }),
  )
  .connect();

// ✅ Ensure logs are cleared only after a successful connection
if (__DEV__) {
  reactotron.clear();
  console.tron = reactotron;
}

export default reactotron;
