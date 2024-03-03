// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import { PLAYER_STATES } from "react-native-media-controls";
import Video, { OnProgressData } from "react-native-video";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import React from "react";
import { Alert, Platform, Linking } from "react-native";
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

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
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

interface SS {
  id: any;
}

export default class VideoAdsController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.fileUploadRes = React.createRef();
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

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
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    this.handleResGetAds(from, message);
  }

  durations = [[10, 20], [20, 30], [30, 40]];
  durationOptions = [{ value: '10-20 seconds' }, { value: '20-30 seconds' }, { value: '30-40 seconds' }]
  mobilePlayer = React.createRef<Video>();
  onCheck = () => {
    if (this.state.selectedDurationIndex >= 0) {
      const minLength = this.durations[this.state.selectedDurationIndex][0];
      const maxLength = this.durations[this.state.selectedDurationIndex][1];
      this.getAds(minLength, maxLength);
      return;
    } else if (this.state.customizedDuration) {
      if (isNaN(Number(this.state.customizedDuration))) {
        Alert.alert("Ads video duration must be a number");
      } else {
        this.getAds(1, Number(this.state.customizedDuration));
      }
      return;
    }
    Alert.alert("Please select Ads length");
  };

  onOpenPreview = () => {
    this.setState({
      isPreviewMode: true
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

  onSelectDuration = (index: number) => {
    this.setState({
      selectedDurationIndex: index,
      customizedDuration: "",
      check: false
    });
  };

  onDurationChange = (text: string) => {
    this.setState({
      customizedDuration: text,
      selectedDurationIndex: -1,
      check: false
    });
  };

  onChangeSkippableTime = (text: string) => {
    this.setState({
      skippableTime: text
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

  seeking = false;
  onSeeking = (data: number) => {
    this.seeking = true;
    this.setState({
      currentTime: data
    });
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

  onProgress = (data: OnProgressData) => {
    if (this.seeking) {
      return;
    }
    this.setState({
      currentTime: data.currentTime
    });
  };

  onVideoLoad = (data: { duration: number }) => {
    const sourceLength = data.duration;
    this.setState({ videoDuration: sourceLength });
  };

  onAdsVideoLoad = () => {
    this.watchAds(this.state.videoAdId)
  }

  onSwitchAds = () => {
    this.setState(prev => {
      return {
        isEnableAds: !prev.isEnableAds
      };
    });
  };

  onSwitchSkippableAds = () => {
    this.setState(prev => {
      return {
        isAdsSkipable: !prev.isAdsSkipable
      };
    });
  };

  onPreviewSeek = (data: number) => {
    this.setState({
      previewCurrentTime: data
    });
  };

  previewSeeking = false;
  onPreviewSeeking = (data: number) => {
    this.previewSeeking = true;
    this.setState({
      previewCurrentTime: data
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

  onOpenLandingPage = () => {
    if (this.state.redirectAdsUrl) {
      Linking.openURL(this.state.redirectAdsUrl);
      this.redirectionalCountApi(this.state.videoAdId);
    }
  };

  playerRef = React.createRef<ReactPlayer>();
  intervalRef: number | null = null;
  fileUploadRes: React.RefObject<HTMLInputElement>;
  getAdsCallId: string = "getAdsCallId";
  watchAdsApiId: string = "watchAdsApiId";
  redirectionalUrlApiId: string = "watchAdsApiId";

  getAds = (minLength: number, maxLength: number) => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAdsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_videoads/videoads/videoads_filter?min=${minLength}&max=${maxLength}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleResGetAds = (from: string, message: Message) => {
    if (
      this.getAdsCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiResponse.errors) {
        this.platformAlert("Something went wrong");
        this.setState({
          check: false
        });
      } else if (apiResponse.data.length == 0) {
        this.platformAlert(
          "There is no suitable ads video for selected duration"
        );
        this.setState({
          videoAdUrl: "",
          redirectAdsUrl: "",
          check: false
        });
      } else {
        this.setState(
          {
            videoAdUrl: apiResponse.data[0].attributes.video_file.adurl,
            redirectAdsUrl: apiResponse.data[0].attributes.redirection_url,
            check: true,
            videoAdId: apiResponse.data[0].id
          },
          () => {
            if (Platform.OS === "web") {
              this.handlePreview();
            }
          }
        );
      }
    }
  };

  watchAds = (adsId: string) => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.watchAdsApiId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_videoads/videoads/${adsId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  redirectionalCountApi = (adsId: string) => {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.redirectionalUrlApiId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_videoads/videoads/video_visit_url?id=${adsId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleSelectFile = () => {
    if (this.fileUploadRes.current) {
      this.fileUploadRes.current.click();
    }
  };

  handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formState: {
        ...this.state.formState,
        [event.target.name]: event.target.checked
      }
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        formState: {
          ...this.state.formState,
          [event.target.name]: event.target.value
        }
      },
      () => {
        if (this.state.formState.inputAdDuration) {
          this.setState({
            formState: {
              ...this.state.formState,
              adDuration: `1-${this.state.formState.inputAdDuration}`
            }
          });
        }
        if (this.state.formState.inputAdSkipTime) {
          this.setState({
            formState: {
              ...this.state.formState,
              adSkipTime: this.state.formState.inputAdSkipTime
            }
          });
        }
      }
    );
  };

  handleSelectChange = (name: string, value: number | string) => {
    this.setState({ formState: { ...this.state.formState, [name]: value } });
  };

  handleSliderTime = (value: number) => {
    this.setState({
      formState: {
        ...this.state.formState,
        timePointForAd: this.secondsToMinutes(value)
      }
    });
  };

  handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile;
    if (event.target.files) {
      selectedFile = event.target.files[0];
    }
    const allowedFormats = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/mpeg",
      "video/quicktime",
      "video/x-matroska",
      "video/x-msvideo",
      "video/x-flv",
      "video/3gpp",
      "video/quicktime"
    ];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB <= 50) {
        if (allowedFormats.includes(selectedFile.type)) {
          this.setState({
            videoFileStats: {
              typeAd: false,
              file: window.URL.createObjectURL(selectedFile)
            },
            tempVideoFile: window.URL.createObjectURL(selectedFile)
          });
        } else {
          alert(`File '${selectedFile.name}' is not video format.`);
        }
      } else {
        alert(`File '${selectedFile.name}' exceeds the 50MB file size limit.`);
      }
    }
  };

  handleGetAd = () => {
    if (!this.state.formState.adsPermission) {
      return this.handlePreview()
    }
    let [minMinute, maxMinute] = String(this.state.formState.adDuration)
      .split("-")
      .map(Number);
    this.getAds(minMinute, maxMinute);
  };

  handlePreview = () => {
    this.setState({
      playbackStats: { ...this.state.playbackStats, playing: true },
      enablePreview: true
    });
  };

  handleVideoEnded = () => {
    if (this.state.videoFileStats.typeAd) {
      this.setState(
        {
          videoFileStats: {
            typeAd: false,
            file: this.state.tempVideoFile as string
          },
          playbackStats: {
            ...this.state.playbackStats,
            playing: true,
            controls: true
          },
          enableSkipBtn: false
        },
        () => {
          if (this.playerRef.current) {
            this.playerRef.current.seekTo(
              this.minutesToSeconds(this.state.formState.timePointForAd)
            );
          }
          if (this.intervalRef) {
            clearInterval(this.intervalRef);
          }
        }
      );
    }
  };

  handleVideoReady = ({ getDuration }: ReactPlayerProps) => {
    const duration = getDuration();
    const formattedDuration = Number(Math.floor(duration));
    this.setState({ videoDuration: formattedDuration });
  };

  handleSkipAdBtnAppearance = () => {
    if (this.state.formState.adSkipable) {
      let skiptime = this.state.formState.adSkipTime * 1 * 1000;
      this.intervalRef = window.setTimeout(() => {
        this.setState({ enableSkipBtn: true });
      }, skiptime);
    }
  };

  handleAdAppearance = (videoStats: ReactPlayerProps) => {
    let playedSeconds = this.secondsToMinutes(
      Math.floor(videoStats.playedSeconds)
    );
    if (
      this.state.formState.timePointForAd == playedSeconds &&
      this.state.formState.adsPermission &&
      this.state.videoAdUrl
    ) {
      this.setState({
        videoFileStats: { typeAd: true, file: this.state.videoAdUrl },
        playbackStats: {
          ...this.state.playbackStats,
          playing: true,
          controls: false
        }
      });
      this.watchAds(this.state.videoAdId);
      this.handleSkipAdBtnAppearance();
    }
  };

  handleGoBack = () => {
    this.setState({
      playbackStats: { ...this.state.playbackStats, playing: false },
      enablePreview: false,
      videoFileStats: {
        typeAd: false,
        file: this.state.tempVideoFile as string
      }
    });
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  };

  handleVisitAdURL = () => {
    window.open(this.state.redirectAdsUrl as string, "_blank");
    this.redirectionalCountApi(this.state.videoAdId);
  };

  secondsToMinutes = (seconds: number) => {
    let timevalue = seconds ? seconds : 0;
    let minutes = Math.floor(timevalue / 60);
    let remainingSeconds = timevalue % 60;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let secondsString =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutesString + ":" + secondsString;
  };

  minutesToSeconds = (timeString: string, typeRaw?: boolean) => {
    let [minutesString, secondsString] = timeString.split(":");
    let minutes = parseInt(minutesString, 10);
    let seconds = parseInt(secondsString, 10);
    let totalSeconds = !typeRaw
      ? minutes * 60 + seconds + 1
      : minutes * 60 + seconds;
    return totalSeconds;
  };

  platformAlert = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert(message);
    }
  };
}

// Customizable Area End
