import Reactotron from 'reactotron-react-native';
import { reactotronRedux, stateResponse } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = '10.129.124.247'; // ⚠️ Replace with your machine IP if using a real device

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'doctor_app',
    host, // ✅ uncomment this if running on a real device
  })
  .useReactNative({
    asyncStorage: true,
    networking: { ignoreUrls: /symbolicate/ },
    editor: false,
    errors: true,
    overlay: false,
  })
  // .use(stateResponse())
  .use(reactotronRedux())
  .connect();

if (__DEV__) {
  reactotron.clear();
  console.tron = reactotron;
}

// ✅ Add this manually so your store can access the enhancer

export default reactotron;
