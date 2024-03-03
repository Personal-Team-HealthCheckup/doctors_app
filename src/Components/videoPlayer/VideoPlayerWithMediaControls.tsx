import moment from "moment";
import React from "react";
import { Alert, Dimensions, Linking, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import Video, { OnProgressData } from "react-native-video";

interface VideoPlayerWithMediaControlsProps {

}
export interface FormState {
    timePointForAd: string;
    adsPermission: boolean;
    adSkipable: boolean;
    adSkipTime: number;
    adDuration: number | string;
    inputAdSkipTime: number | null;
    inputAdDuration: number | null;
}
export interface VideoFileStats {
    typeAd: boolean;
    file: string;
}
export interface PlaybackStats {
    playing: boolean;
    controls: boolean;
}
interface VideoPlayerWithMediaControlsState {
    currentTime: number;
    playerState: PLAYER_STATES;
    isEnableAds: boolean;
    isAdsSkipable: boolean;
    selectedDurationIndex: number;
    customizedDuration: string;
    videoURL: string;
    skippableTime: string;
    check: boolean;
    isPreviewMode: boolean;
    previewPlayerState: PLAYER_STATES;
    previewCurrentTime: number;
    adsCurrentTime: number;
    isAdsOpen: boolean;
    isAdsSkipped: boolean;
    tempVideoFile: string | null;
    videoFileStats: VideoFileStats;
    formState: FormState;
    playbackStats: PlaybackStats;
    videoDuration: number;
    enableSkipBtn: boolean;
    enablePreview: boolean;
    redirectAdsUrl: string | null;
    videoAdUrl: string;
    videoAdId: string;
    token: string,
}

class VideoPlayerWithMediaControls extends React.Component<VideoPlayerWithMediaControlsProps, VideoPlayerWithMediaControlsState> {
    durations = [[10, 20], [20, 30], [30, 40]];
    durationOptions = [{ value: '10-20 seconds' }, { value: '20-30 seconds' }, { value: '30-40 seconds' }]
    mobilePlayer = React.createRef<Video>();
    previewSeeking = false;
    seeking = false;
    constructor(props: VideoPlayerWithMediaControlsProps) {
        super(props);
        this.state = {
            currentTime: 0,
            playerState: PLAYER_STATES.PAUSED,
            isEnableAds: false,
            isAdsSkipable: false,
            selectedDurationIndex: -1,
            customizedDuration: "",
            videoURL: "",
            skippableTime: "",
            check: false,
            isPreviewMode: false,
            previewCurrentTime: 0,
            previewPlayerState: PLAYER_STATES.PAUSED,
            adsCurrentTime: 0,
            isAdsOpen: false,
            isAdsSkipped: false,
            tempVideoFile: null,
            enableSkipBtn: false,
            enablePreview: false,
            formState: {
                timePointForAd: "00:00",
                adsPermission: false,
                adSkipable: false,
                adSkipTime: 0,
                adDuration: "10-20",
                inputAdSkipTime: null,
                inputAdDuration: null
            },
            playbackStats: {
                playing: false,
                controls: true
            },
            videoFileStats: {
                typeAd: false,
                file: ""
            },
            videoDuration: 0,
            redirectAdsUrl: "",
            videoAdUrl: "",
            videoAdId: "",
            token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzIwLCJleHAiOjE2ODkwNTc4NzV9.UnJTGBnOZaQ0dHToSiZfXXgyBwkjM_GOxr8n7blM4T0IGmetyeSVnFwJuiBiN92JCDs3NyxjEYLuPs0XsJuFNQ"
        };
    }

    onPreviewProgress = (data: OnProgressData) => {
        if (this.previewSeeking) {
            return;
        }

        let openAds = false;
        if (data.currentTime > this.state.currentTime) {
            openAds = true;
        }
        if (this.state.isAdsSkipped) {
            openAds = false;
        }
        this.setState({
            previewCurrentTime: data.currentTime,
            isAdsOpen: openAds
        });
    };

    onPreviewPause = () => {
        this.setState(prev => {
            if (prev.previewPlayerState == PLAYER_STATES.PLAYING) {
                return {
                    previewPlayerState: PLAYER_STATES.PAUSED
                };
            } else {
                return {
                    previewPlayerState: PLAYER_STATES.PLAYING
                };
            }
        });
    };


    onPreviewSeek = (data: number) => {
        this.setState({
            previewCurrentTime: data
        });
    };

    onPreviewSeeking = (data: number) => {
        this.previewSeeking = true;
        this.setState({
            previewCurrentTime: data
        });
    };

    onAdsProgress = (data: OnProgressData) => {
        this.setState({
            adsCurrentTime: data.currentTime,
            previewPlayerState: PLAYER_STATES.PAUSED
        });
    };
    onSkipAds = () => {
        this.setState({
            isAdsSkipped: true,
            isAdsOpen: false,
            previewPlayerState: PLAYER_STATES.PLAYING
        });
    };
    onSwitchAds = () => {
        this.setState(prev => {
            return {
                isEnableAds: !prev.isEnableAds
            };
        });
    };
    onDurationChange = (text: string) => {
        this.setState({
            customizedDuration: text,
            selectedDurationIndex: -1,
            check: false
        });
    };
    onSeeking = (data: number) => {
        this.seeking = true;
        this.setState({
            currentTime: data
        });
    };

    onSeek = (data: number) => {
        this.setState({
            currentTime: data
        });
        if (this.mobilePlayer.current) {
            this.mobilePlayer.current.seek(data);
        }
        this.seeking = false;
    };
    onPause = () => {
        this.setState(prev => {
            if (prev.playerState == PLAYER_STATES.PLAYING) {
                return {
                    playerState: PLAYER_STATES.PAUSED
                };
            } else {
                return {
                    playerState: PLAYER_STATES.PLAYING
                };
            }
        });
    };

    onVideoLoad = (data: { duration: number }) => {
        const sourceLength = data.duration;
        this.setState({ videoDuration: sourceLength });
    };

    onAdsVideoLoad = () => {
        this.watchAds(this.state.videoAdId)
    }
    onOpenLandingPage = () => {
        if (this.state.redirectAdsUrl) {
            Linking.openURL(this.state.redirectAdsUrl);
            console.log('====================================');
            console.log("rediredt api call");
            console.log('====================================');
        }
    };

    watchAds = (adsId: string) => {
        console.log('====================================');
        console.log("watch Ad", adsId);
        console.log('====================================');
    };
    onChangeSkippableTime = (text: string) => {
        this.setState({
            skippableTime: text
        });
    };

    onCheck = () => {
        if (this.state.selectedDurationIndex >= 0) {
            const minLength = this.durations[this.state.selectedDurationIndex][0];
            const maxLength = this.durations[this.state.selectedDurationIndex][1];
            // this.getAds(minLength, maxLength);
            return;
        } else if (this.state.customizedDuration) {
            if (isNaN(Number(this.state.customizedDuration))) {
                Alert.alert("Ads video duration must be a number");
            } else {
                // this.getAds(1, Number(this.state.customizedDuration));
            }
            return;
        }
        Alert.alert("Please select Ads length");
    };


    onBackPreview = () => {
        this.setState({
            isPreviewMode: false,
            isAdsSkipped: false,
            check: false,
            isAdsOpen: false,
            previewPlayerState: PLAYER_STATES.PAUSED,
            previewCurrentTime: 0,
            adsCurrentTime: 0
        });
    };

    onProgress = (data: OnProgressData) => {
        if (this.seeking) {
            return;
        }
        this.setState({
            currentTime: data.currentTime
        });
    };
    onChooseVideo = async () => {
        const picker = require("react-native-image-picker").default;
        const options: { mediaType: string } = {
            mediaType: "video"
        };
        picker.launchImageLibrary(options, (data: { uri: string }) => {
            if (data.uri) {
                this.setState({
                    videoURL: data.uri
                });
            }
        });
    };
    onSwitchSkippableAds = () => {
        this.setState(prev => {
            return {
                isAdsSkipable: !prev.isAdsSkipable
            };
        });
    };
    onOpenPreview = () => {
        this.setState({
            isPreviewMode: true
        });
    };
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
                                    children={undefined}
                                />
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
                                            }} />
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
                                                <Text style={{ color: 'white' }}>{moment(this.state.adsCurrentTime * 1000).format('mm:ss')}</Text>
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
                                                <Text style={{ color: 'white' }}>Skip</Text>
                                            </TouchableOpacity> : null}
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>

                            <Text
                                testID="txt-back"
                                onPress={this.onBackPreview}
                                style={{
                                    padding: 10
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
                                <Text style={{ color: 'white' }}>
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
                                ><Text>dsfsdff</Text>
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
                                    {/* <Dropdown
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
                      /> */}
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
                                        <Text style={{ color: 'white' }}>Check</Text>
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
                                        <Text style={{ color: 'white' }}>Preview</Text>
                                    </TouchableOpacity>}
                                </>
                            }
                        </>}
                </View>
            </ScrollView>
        );
    }
}

export default VideoPlayerWithMediaControls;

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