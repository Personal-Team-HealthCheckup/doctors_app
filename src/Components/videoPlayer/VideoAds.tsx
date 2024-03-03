// Customizable Area Start
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  Switch
} from "react-native";
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls'
import moment from "moment";
import { Dropdown } from "react-native-material-dropdown";

import VideoAdsController, {
  Props,
  configJSON
} from "./VideoAdsController";

export default class VideoAds extends VideoAdsController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Merge Engine UI Engine Code */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.isPreviewMode ? 
            <>
              <View
              testID="view-video-preview" 
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width * 3 / 4,
                backgroundColor: 'black',
              }}>
                <Video testID="video-preview" source={{ uri: this.state.videoURL }}   // Can be a URL or a local file.
                  onProgress={this.onPreviewProgress}
                  paused={this.state.previewPlayerState == PLAYER_STATES.ENDED || this.state.previewPlayerState == PLAYER_STATES.PAUSED}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'black',
                  }} />
                <MediaControls
                  containerStyle={{
                    flex: 1,
                  }}
                  isFullScreen={false}
                  duration={this.state.videoDuration}
                  isLoading={false}
                  mainColor="orange"
                  onPaused={this.onPreviewPause}
                  onReplay={() => { }}
                  onSeek={this.onPreviewSeek}
                  onSeeking={this.onPreviewSeeking}
                  playerState={this.state.previewPlayerState}
                  progress={this.state.previewCurrentTime}
                >
                </MediaControls>
                {this.state.isAdsOpen && 
                <>
                  <Video testID="video-ads" source={{ uri: this.state.videoAdUrl }}   // Can be a URL or a local file.
                    onProgress={this.onAdsProgress}
                    onEnd={this.onSkipAds}
                    onLoad={this.onAdsVideoLoad}
                    paused={false}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'black',
                    }}/>
                  <TouchableOpacity 
                    testID="btn-open-landing-page"
                    onPress={this.onOpenLandingPage}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      top: 0,
                      right: 0,
                    }}>
                    <View style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}>
                      <Text style={{color: 'white'}}>{moment(this.state.adsCurrentTime * 1000).format('mm:ss')}</Text>
                    </View>
                    {this.state.isAdsSkipable && (this.state.adsCurrentTime > Number(this.state.skippableTime)) ? <TouchableOpacity
                      testID="btn-skip-ads"
                      onPress={this.onSkipAds}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        zIndex: 100,
                        backgroundColor: 'black',
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: 'white',
                        padding: 6
                      }}>
                      <Text style={{color: 'white'}}>Skip</Text>
                    </TouchableOpacity> : null}
                  </TouchableOpacity>
                </>
                }
              </View>

              <Text
              testID="txt-back"
              onPress={this.onBackPreview}
              style={{
                padding:10
              }}>Back</Text>
            </>

            :
            <>
            <TouchableOpacity 
              testID="btn-choose-video"
              style={{
                marginVertical: 10,
                backgroundColor: 'gray',
                padding: 8,
              }}
              onPress={this.onChooseVideo}
            >
              <Text style={{color: 'white'}}>
                Select Video
              </Text>
            </TouchableOpacity>
            <View style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width * 3 / 4,
              backgroundColor: 'black',
            }}>
              <Video source={{ uri: this.state.videoURL }}   // Can be a URL or a local file.
                onProgress={this.onProgress}
                paused={this.state.playerState == PLAYER_STATES.ENDED || this.state.playerState == PLAYER_STATES.PAUSED}
                ref={this.mobilePlayer}
                onLoad={this.onVideoLoad}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'black',
                }} />
              <MediaControls
                containerStyle={{
                  flex: 1,
                }}
                isFullScreen={false}
                duration={this.state.videoDuration}
                isLoading={false}
                mainColor="orange"
                onPaused={this.onPause}
                onReplay={() => { }}
                onSeek={this.onSeek}
                onSeeking={this.onSeeking}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
              >
              </MediaControls>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text>Do you want to turn on Ads</Text>
              <Switch
                testID="switch-turn-on-off-ads"
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.onSwitchAds}
                value={this.state.isEnableAds}
              />
            </View>
            {this.state.isEnableAds &&
              <>
                <View 
                  testID="text-Ads-long"
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 16,
                  }}
                >
                  <Text>How long do you want your Ads to be?</Text>
                </View>
                  <Dropdown
                    testID="btn-select-durations"
                    rippleOpacity={0.2}
                    value={this.durationOptions[this.state.selectedDurationIndex]?.value}
                    data={this.durationOptions}
                    inputContainerStyle={{
                      width: 150, 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onChangeText={(value, index) => {
                      this.onSelectDuration(index)
                    }}
                  />
                <Text>OR</Text>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16,
                }}>
                  <TextInput
                    testID="input-customize-duration"
                    style={{
                      textAlign: 'center',
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: 'blue'
                    }}
                    value={this.state.customizedDuration}
                    keyboardType="number-pad"
                    onChangeText={this.onDurationChange}
                  />
                  <Text> seconds</Text>
                </View>

                <Text style={{ textAlign: 'center', marginTop: 16, }}>Select timestamp that you want to place the Ads by dragging video player</Text>
                <Text style={{ textAlign: 'center', marginTop: 8, }}>{`Ads will be placed at ${moment(this.state.currentTime * 1000).format("mm:ss")}`}</Text>

                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16,
                }}>
                  <Text>Do you want Ads to be skippable?</Text>
                  <Switch
                    testID="switch-skippable"
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.onSwitchSkippableAds}
                    value={this.state.isAdsSkipable}
                  />
                </View>
                {this.state.isAdsSkipable &&
                  <>
                    <Text testID="text-skippable">Skipable after</Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <TextInput
                        testID="input-skippable-time"
                        style={{
                          textAlign: 'center',
                          borderRadius: 4,
                          borderWidth: 1,
                          borderColor: 'blue'
                        }}
                        keyboardType="number-pad"
                        value={this.state.skippableTime}
                        onChangeText={this.onChangeSkippableTime}
                      />
                      <Text> seconds</Text>
                    </View>
                  </>
                }

                <TouchableOpacity 
                testID="btn-check-ads"
                style={{
                  marginVertical: 8,
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={this.onCheck}
                >
                  <Text style={{color: 'white'}}>Check</Text>
                </TouchableOpacity>

                {this.state.check && <TouchableOpacity 
                testID="btn-open-preview"
                style={{
                  marginVertical: 8,
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={this.onOpenPreview}
                >
                  <Text style={{color: 'white'}}>Preview</Text>
                </TouchableOpacity>}
              </>
            }
            </>}
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
});

// Customizable Area End
