import 'react-native-gesture-handler';
import React from 'react';
import Video, {LoadError, OnLoadData, OnProgressData} from 'react-native-video';
import {View, Text, StyleSheet, Platform, NativeModules} from 'react-native';
const {ForegroundServiceModule} = NativeModules;
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
interface VideoComponentProps {}

const Url =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
interface VideoComponentState {
  isPlay: boolean;
  isFullScreen: boolean;
  duration: number;
  isLoading: boolean;
  currentTime: number;
  playerState: PLAYER_STATES;
  screenType?: 'stretch' | 'cover' | 'contain' | 'none';
}
class VideoComponent extends React.Component<
  VideoComponentProps,
  VideoComponentState
> {
  videoRef: React.RefObject<Video> | undefined;
  constructor(props: VideoComponentProps) {
    super(props);
    this.state = {
      isPlay: false,
      isFullScreen: false,
      duration: 0,
      isLoading: true,
      currentTime: 0,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'contain',
    };
    this.videoRef = React.createRef();
  }
  handlePlayPuaseVideo = () => {
    this.setState({isPlay: !this.state.isPlay});
  };
  handleLoadding = () => {
    this.setState({isLoading: true});
  };
  handeEnd = () => {
    this.setState({playerState: PLAYER_STATES.ENDED});
  };

  handleFullScreen = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen,
      screenType: this.state.screenType === 'contain' ? 'cover' : 'contain',
    });
  };

  requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (result === RESULTS.GRANTED) {
        // Microphone access granted, handle accordingly
      } else {
        // Microphone access denied, inform the user
      }
    } else {
      const result = await request(PERMISSIONS.IOS.MICROPHONE);
      if (result === RESULTS.GRANTED) {
        // Microphone access granted, handle accordingly
      } else {
        // Microphone access denied, inform the user
      }
    }
  };

  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        // Camera access granted, handle accordingly
      } else {
        // Camera access denied, inform the user
      }
    } else {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        // Camera access granted, handle accordingly
      } else {
        // Camera access denied, inform the user
      }
    }
  };

  checkMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log('---result', result);
      // Handle the result accordingly
    } else {
      const result = await check(PERMISSIONS.IOS.MICROPHONE);
      console.log('---result', result);
      // Handle the result accordingly
    }
  };

  checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      console.log('---result', result);
      // Handle the result accordingly
    } else {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      console.log('---result', result);

      // Handle the result accordingly
    }
  };

  componentWillUnmount(): void {
    ForegroundServiceModule.stopService()
  }
  componentDidMount(): void {
    console.log('---result', ForegroundServiceModule);
    ForegroundServiceModule.startService()
    this.requestMicrophonePermission();
    this.requestCameraPermission();
  }
  handleDuration = (data: OnLoadData) => {
    this.setState({duration: data.duration, isLoading: false});
  };
  handleError = (error: LoadError) => {
    console.error('------error', error);
  };

  handleReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoRef?.current?.seek(0);
    this.setState({currentTime: 0});
  };
  onSeek = (seek: number) => {
    this.videoRef?.current?.seek(seek);
  };
  onSeeking = (currentTime: number) => {
    this.setState({currentTime});
  };
  onProgress = (progress: OnProgressData) => {
    if (
      !this.state.isLoading &&
      this.state.playerState !== PLAYER_STATES.ENDED
    ) {
      this.setState({currentTime: progress.currentTime});
    }
  };
  render() {
    return (
      <>
        <View style={styles.main}>
          <Video
            ref={this.videoRef}
            source={{
              uri: Url,
            }}
            controls={false}
            style={styles.container}
            onFullscreenPlayerDidDismiss={() => this.handleFullScreen()}
            resizeMode={this.state.screenType}
            paused={!this.state.isPlay}
            onLoad={this.handleDuration}
            onError={this.handleError}
            onLoadStart={this.handleLoadding}
            onEnd={this.handeEnd}
            onProgress={this.onProgress}
            repeat
            
          />
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="#333"
            onFullScreen={this.handleFullScreen}
            onPaused={this.handlePlayPuaseVideo}
            onReplay={this.handleReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            isFullScreen={this.state.isFullScreen}
            containerStyle={{}}>
            <MediaControls.Toolbar>
              <View style={styles.childStyle}>
                <Text> Toolbar</Text>
              </View>
            </MediaControls.Toolbar>
          </MediaControls>
        </View>
      </>
    );
  }
}

export default VideoComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  childStyle: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  main: {
    flex: 1,
  },
});
