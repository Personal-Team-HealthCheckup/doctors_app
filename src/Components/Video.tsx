/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import Video, {LoadError, OnLoadData, OnProgressData} from 'react-native-video';
import {View, Text} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
interface AppProps {}

const Url =
  'https://vod-progressive.akamaized.net/exp=1695149636~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4179%2F23%2F595899597%2F2804927561.mp4~hmac=27912c4f97ae31231b52398ceeee34bd322136e21e90ef71cf9cf0cb5c222dcb/vimeo-prod-skyfire-std-us/01/4179/23/595899597/2804927561.mp4';
interface AppState {
  isPlay: boolean;
  isFullScreen: boolean;
  duration: number;
  isLoading: boolean;
  currentTime: number;
  playerState: PLAYER_STATES;
  screenType: 'stretch' | 'cover' | 'contain' | 'none' | undefined;
}
class App extends React.Component<AppProps, AppState> {
  videoRef: any;
  constructor(props: AppProps) {
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
  }
  handlePlayPuaseVideo = () => {
    console.log('-----thisvideo is playing', this.state.isPlay);
    this.setState({isPlay: !this.state.isPlay});
  };
  handleLoadding = () => {
    this.setState({isLoading: true});
  };
  handeEnd = () => {
    this.setState({playerState: PLAYER_STATES.ENDED});
  };

  handleFullScreen = () => {
    console.log('-----thisvideo is isFullScreen', this.state.isFullScreen);
    this.setState({
      isFullScreen: !this.state.isFullScreen,
      screenType: this.state.screenType === 'contain' ? 'cover' : 'contain',
    });
  };
  componentDidMount(): void {
    console.log('-----thisvideo is playing', this.videoRef);
  }
  handleDuration = (data: OnLoadData) => {
    console.log('----data', data.duration);

    this.setState({duration: data.duration, isLoading: false});
  };
  handleError = (error: LoadError) => {
    console.log('----error', error);
  };

  handleReplay = () => {
    console.log('---this.videoRef?.current?.seek', this.videoRef);

    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoRef?.current?.seek(0);
    this.setState({currentTime: 0});
  };
  onSeek = (seek: number) => {
    console.log('---seek', seek);

    this.videoRef?.current?.seek(seek);
  };
  onSeeking = (currentTime: number) => {
    console.log('----currentTime', currentTime);

    this.setState({currentTime});
  };
  onProgress = (progress: OnProgressData) => {
    console.log('----progress', progress);
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
        <View
          style={{
            flex: 1,
          }}>
          <Video
            ref={ref => (this.videoRef = ref)}
            source={{
              uri: Url,
            }}
            controls={false}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'black',
              justifyContent: 'center',
            }}
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
              <View
                style={{
                  marginTop: 30,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 5,
                }}>
                <Text> Toolbar</Text>
              </View>
            </MediaControls.Toolbar>
          </MediaControls>
        </View>
      </>
    );
  }
}

export default App;
