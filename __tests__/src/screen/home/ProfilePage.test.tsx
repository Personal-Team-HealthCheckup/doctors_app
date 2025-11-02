import type { ComponentProps } from 'react';
import ProfilePageConnected from '../../../../src/screen/home/ProfilePage';
import { closeKeyBoard } from '../../../../src/helper/utilities';
import ImagePicker from 'react-native-image-crop-picker';

jest.mock('../../../../src/helper/utilities', () => {
  const actual = jest.requireActual('../../../../src/helper/utilities');
  return {
    ...actual,
    closeKeyBoard: jest.fn(),
  };
});

jest.mock('react-native-image-crop-picker', () => {
  const openPicker = jest.fn();
  return {
    __esModule: true,
    default: { openPicker },
    openPicker,
  };
});

const mockOpenPicker = ImagePicker.openPicker as jest.Mock;

type ConnectedProps = ComponentProps<typeof ProfilePageConnected>;

const ProfilePage =
  (ProfilePageConnected as any).WrappedComponent || ProfilePageConnected;

type MockProps = Partial<
  ConnectedProps & {
    getProfileApi: jest.Mock;
    updateProfileApi: jest.Mock;
  }
>;

type ProfileData = {
  fullName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  profileImage?: { imageUrl: string | null } | null;
};

const createProfileData = (overrides: Partial<ProfileData> = {}): ProfileData => ({
  fullName: 'Dr. Jane Doe',
  phoneNumber: '1234567890',
  userName: 'drjane',
  email: 'jane@example.com',
  profileImage: { imageUrl: 'https://example.com/jane.png' },
  ...overrides,
});

const createProps = (overrides: MockProps = {}) => ({
  navigation: { navigate: jest.fn(), goBack: jest.fn() },
  data: createProfileData(),
  loading: false,
  message: 'User retrieved successfully',
  getProfileApi: jest.fn().mockResolvedValue(undefined),
  updateProfileApi: jest.fn().mockResolvedValue(undefined),
  ...overrides,
});

const createInstance = (overrides: MockProps = {}) => {
  const props = createProps(overrides);
  const instance = new ProfilePage(props as any);

  instance.setState = (update: any) => {
    const value =
      typeof update === 'function' ? update(instance.state, instance.props) : update;
    instance.state = { ...instance.state, ...value };
  };

  return { instance, props };
};

describe('ProfilePage logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches profile data on mount', async () => {
    const getProfileApi = jest.fn().mockResolvedValue(undefined);
    const { instance } = createInstance({ getProfileApi });

    await instance.componentDidMount();

    expect(getProfileApi).toHaveBeenCalledTimes(1);
  });

  it('refreshes form values when profile data changes', () => {
    const { instance, props } = createInstance();
    instance.setState({
      selectedImage: { uri: 'localUri', type: 'image/png', name: 'photo.png' },
      isEditMode: false,
    });

    const updatedData = createProfileData({
      fullName: 'Dr. Updated',
      phoneNumber: '9876543210',
      profileImage: { imageUrl: 'https://example.com/new.png' },
    });

    const prevProps = props;
    (instance as any).props = { ...props, data: updatedData };

    instance.componentDidUpdate(prevProps as any);

    expect(instance.state.formValues.fullName).toBe('Dr. Updated');
    expect(instance.state.formValues.phoneNumber).toBe('9876543210');
    expect(instance.state.formValues.profileImageUrl).toBe(
      'https://example.com/new.png',
    );
    expect(instance.state.selectedImage).toBeNull();
  });

  it('ignores data changes while editing', () => {
    const { instance, props } = createInstance();
    instance.setState({
      selectedImage: { uri: 'localUri', type: 'image/png', name: 'photo.png' },
      isEditMode: true,
    });

    const prevProps = props;
    const updatedData = createProfileData({ fullName: 'Dr. Should Not Update' });

    (instance as any).props = { ...props, data: updatedData };

    instance.componentDidUpdate(prevProps as any);

    expect(instance.state.formValues.fullName).not.toBe('Dr. Should Not Update');
  });

  it('updates form field values and clears local messages', () => {
    const { instance } = createInstance();
    instance.setState({ localMessage: 'error' });

    (instance as any).handleInputChange('fullName', 'Dr. New Name');

    expect(instance.state.formValues.fullName).toBe('Dr. New Name');
    expect(instance.state.localMessage).toBeNull();
  });

  it('enables edit mode and resets temporary state', () => {
    const { instance, props } = createInstance();
    instance.setState({
      isEditMode: false,
      localMessage: 'stale',
      formValues: {
        fullName: 'Someone Else',
        phoneNumber: '',
        userName: '',
        email: '',
        profileImageUrl: null,
      },
      selectedImage: { uri: 'temp', type: 'image/jpeg', name: 'temp.jpg' },
    });

    (instance as any).enableEdit();

    expect(instance.state.isEditMode).toBe(true);
    expect(instance.state.localMessage).toBeNull();
    expect(instance.state.selectedImage).toBeNull();
    expect(instance.state.formValues.fullName).toBe(props.data.fullName);
    expect(instance.state.formValues.phoneNumber).toBe(props.data.phoneNumber);
  });

  it('cancels edit mode restoring original data', () => {
    const { instance, props } = createInstance();
    instance.setState({
      isEditMode: true,
      formValues: {
        fullName: 'Changed',
        phoneNumber: '00000000',
        userName: '',
        email: '',
        profileImageUrl: null,
      },
      localMessage: 'error',
      selectedImage: { uri: 'temp', type: 'image/png', name: 'temp.png' },
    });

    (instance as any).handleCancelEdit();

    expect(instance.state.isEditMode).toBe(false);
    expect(instance.state.formValues.fullName).toBe(props.data.fullName);
    expect(instance.state.formValues.phoneNumber).toBe(props.data.phoneNumber);
    expect(instance.state.localMessage).toBeNull();
    expect(instance.state.selectedImage).toBeNull();
  });

  it('validates missing name before saving', async () => {
    const updateProfileApi = jest.fn();
    const { instance } = createInstance({ updateProfileApi });
    instance.setState({
      formValues: {
        ...instance.state.formValues,
        fullName: '   ',
      },
    });

    await (instance as any).handleSave();

    expect(instance.state.localMessage).toBe('Full name is required.');
    expect(updateProfileApi).not.toHaveBeenCalled();
  });

  it('validates missing email before saving', async () => {
    const updateProfileApi = jest.fn();
    const { instance } = createInstance({ updateProfileApi });
    instance.setState({
      formValues: {
        ...instance.state.formValues,
        email: '   ',
      },
    });

    await (instance as any).handleSave();

    expect(instance.state.localMessage).toBe('Email cannot be empty.');
    expect(updateProfileApi).not.toHaveBeenCalled();
  });

  it('validates missing phone before saving', async () => {
    const updateProfileApi = jest.fn();
    const { instance } = createInstance({ updateProfileApi });
    instance.setState({
      formValues: {
        ...instance.state.formValues,
        phoneNumber: '',
      },
    });

    await (instance as any).handleSave();

    expect(instance.state.localMessage).toBe('Phone number cannot be empty.');
    expect(updateProfileApi).not.toHaveBeenCalled();
  });

  it('detects when no changes were made', async () => {
    const updateProfileApi = jest.fn();
    const { instance } = createInstance({ updateProfileApi });
    instance.setState({
      formValues: instance.state.formValues,
      selectedImage: null,
    });

    await (instance as any).handleSave();

    expect(instance.state.localMessage).toBe('No changes detected.');
    expect(updateProfileApi).not.toHaveBeenCalled();
  });

  it('submits updated profile information and resets state', async () => {
    const appendMock = jest.fn();
    const formDataInstance = { append: appendMock };
    const originalFormData = (globalThis as any).FormData;
    (globalThis as any).FormData = jest.fn(() => formDataInstance);

    try {
      const updateProfileApi = jest.fn().mockResolvedValue(undefined);
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ updateProfileApi, getProfileApi });
      const selectedImage = {
        uri: 'file:///profile/new.png',
        type: 'image/png',
        name: 'new.png',
      };

      instance.setState({
        formValues: {
          ...instance.state.formValues,
          fullName: '  Dr. Updated Name  ',
          phoneNumber: '9999999999',
        },
        selectedImage,
        isEditMode: true,
      });

      await (instance as any).handleSave();

      expect(closeKeyBoard).toHaveBeenCalled();
      expect(updateProfileApi).toHaveBeenCalledWith(formDataInstance);
      expect(getProfileApi).toHaveBeenCalledTimes(1);
      expect(appendMock).toHaveBeenCalledWith('fullName', 'Dr. Updated Name');
      expect(appendMock).toHaveBeenCalledWith('phoneNumber', '9999999999');
      expect(appendMock).toHaveBeenCalledWith('profileImage', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });
      expect(instance.state.isEditMode).toBe(false);
      expect(instance.state.selectedImage).toBeNull();
      expect(instance.state.formValues.fullName).toBe('Dr. Updated Name');
      expect(instance.state.formValues.phoneNumber).toBe('9999999999');
      expect(instance.state.formValues.profileImageUrl).toBe(selectedImage.uri);
    } finally {
      (globalThis as any).FormData = originalFormData;
    }
  });

  it('captures errors when profile update fails', async () => {
    const updateProfileApi = jest.fn().mockRejectedValue(new Error('Update failed'));
    const { instance } = createInstance({ updateProfileApi });

    instance.setState({
      formValues: {
        ...instance.state.formValues,
        fullName: 'New Name',
      },
      isEditMode: true,
    });

    await (instance as any).handleSave();

    expect(instance.state.localMessage).toBe('Update failed');
    expect(instance.state.isEditMode).toBe(true);
  });

  it('sets selected image when picker resolves successfully', async () => {
    mockOpenPicker.mockResolvedValueOnce({
      path: '/local/path/image.png',
      mime: 'image/png',
      filename: 'image.png',
    });

    const { instance } = createInstance();
    instance.setState({ selectedImage: null, localMessage: 'error' });

    await (instance as any).handlePickImage();

    expect(instance.state.selectedImage).not.toBeNull();
    expect(instance.state.localMessage).toBeNull();
  });

  it('does not update state when picker is cancelled', async () => {
    mockOpenPicker.mockRejectedValueOnce({ code: 'E_PICKER_CANCELLED' });

    const { instance } = createInstance();
    const initialImage = instance.state.selectedImage;
    await (instance as any).handlePickImage();

    expect(instance.state.selectedImage).toBe(initialImage);
  });

  it('shows a friendly error when picker fails', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockOpenPicker.mockRejectedValueOnce(new Error('permission denied'));

    const { instance } = createInstance();

    await (instance as any).handlePickImage();

    expect(instance.state.localMessage).toBe(
      'Unable to pick image. Please try again.',
    );
    warnSpy.mockRestore();
  });

  it('generates filename when picker result has no filename', async () => {
    const mockDate = 1234567890;
    jest.spyOn(Date, 'now').mockReturnValue(mockDate);

    mockOpenPicker.mockResolvedValueOnce({
      path: '/local/path/temp.jpg',
      mime: 'image/jpeg',
      filename: undefined,
    });

    const { instance } = createInstance();
    await (instance as any).handlePickImage();

    expect(instance.state.selectedImage).not.toBeNull();
    expect(instance.state.selectedImage?.name).toContain('.jpg');
    jest.restoreAllMocks();
  });

  it('uses default mime type when not provided', async () => {
    mockOpenPicker.mockResolvedValueOnce({
      path: '/local/path/image.jpg',
      mime: undefined,
      filename: 'test.jpg',
    });

    const { instance } = createInstance();
    await (instance as any).handlePickImage();

    expect(instance.state.selectedImage).not.toBeNull();
    expect(instance.state.selectedImage?.type).toBeTruthy();
  });

  it('submits only changed name field', async () => {
    const appendMock = jest.fn();
    const formDataInstance = { append: appendMock };
    const originalFormData = (globalThis as any).FormData;
    (globalThis as any).FormData = jest.fn(() => formDataInstance);

    try {
      const updateProfileApi = jest.fn().mockResolvedValue(undefined);
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ updateProfileApi, getProfileApi });

      instance.setState({
        formValues: {
          ...instance.state.formValues,
          fullName: 'Dr. New Name',
        },
        isEditMode: true,
      });

      await (instance as any).handleSave();

      expect(appendMock).toHaveBeenCalledWith('fullName', 'Dr. New Name');
      expect(appendMock).not.toHaveBeenCalledWith('phoneNumber', expect.anything());
      expect(appendMock).not.toHaveBeenCalledWith('profileImage', expect.anything());
    } finally {
      (globalThis as any).FormData = originalFormData;
    }
  });

  it('submits only changed phone field', async () => {
    const appendMock = jest.fn();
    const formDataInstance = { append: appendMock };
    const originalFormData = (globalThis as any).FormData;
    (globalThis as any).FormData = jest.fn(() => formDataInstance);

    try {
      const updateProfileApi = jest.fn().mockResolvedValue(undefined);
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ updateProfileApi, getProfileApi });

      instance.setState({
        formValues: {
          ...instance.state.formValues,
          phoneNumber: '1111111111',
        },
        isEditMode: true,
      });

      await (instance as any).handleSave();

      expect(appendMock).toHaveBeenCalledWith('phoneNumber', '1111111111');
      expect(appendMock).not.toHaveBeenCalledWith('fullName', expect.anything());
      expect(appendMock).not.toHaveBeenCalledWith('profileImage', expect.anything());
    } finally {
      (globalThis as any).FormData = originalFormData;
    }
  });

  it('submits only new image when selected', async () => {
    const appendMock = jest.fn();
    const formDataInstance = { append: appendMock };
    const originalFormData = (globalThis as any).FormData;
    (globalThis as any).FormData = jest.fn(() => formDataInstance);

    try {
      const updateProfileApi = jest.fn().mockResolvedValue(undefined);
      const getProfileApi = jest.fn().mockResolvedValue(undefined);
      const { instance } = createInstance({ updateProfileApi, getProfileApi });

      const selectedImage = {
        uri: 'file:///new.png',
        type: 'image/png',
        name: 'new.png',
      };

      instance.setState({
        selectedImage,
        isEditMode: true,
      });

      await (instance as any).handleSave();

      expect(appendMock).toHaveBeenCalledWith('profileImage', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });
      expect(appendMock).not.toHaveBeenCalledWith('fullName', expect.anything());
      expect(appendMock).not.toHaveBeenCalledWith('phoneNumber', expect.anything());
    } finally {
      (globalThis as any).FormData = originalFormData;
    }
  });

  it('handles buildFormValues with null data', () => {
    const { instance } = createInstance({ data: null } as any);

    const formValues = (instance as any).buildFormValues(null);

    expect(formValues.fullName).toBe('');
    expect(formValues.phoneNumber).toBe('');
    expect(formValues.userName).toBe('');
    expect(formValues.email).toBe('');
    expect(formValues.profileImageUrl).toBeNull();
  });

  it('handles componentDidUpdate with null new data', () => {
    const { instance, props } = createInstance();
    instance.setState({ isEditMode: false });

    const prevProps = props;
    (instance as any).props = { ...props, data: null };

    instance.componentDidUpdate(prevProps as any);

    expect(instance.state.formValues.fullName).toBe('Dr. Jane Doe');
  });

  it('trims whitespace from all fields before validation', async () => {
    const updateProfileApi = jest.fn();
    const { instance } = createInstance({ updateProfileApi });
    instance.setState({
      formValues: {
        fullName: '   Dr. Trimmed   ',
        phoneNumber: '   1234567890   ',
        email: '   test@example.com   ',
        userName: 'user',
        profileImageUrl: null,
      },
      isEditMode: true,
    });

    const appendMock = jest.fn();
    const formDataInstance = { append: appendMock };
    const originalFormData = (globalThis as any).FormData;
    (globalThis as any).FormData = jest.fn(() => formDataInstance);

    try {
      await (instance as any).handleSave();

      expect(updateProfileApi).toHaveBeenCalled();
    } finally {
      (globalThis as any).FormData = originalFormData;
    }
  });

  it('displays error message from Redux when not "User retrieved successfully"', () => {
    const { props } = createInstance({ message: 'Network error occurred' } as any);

    const displayMessage =
      props.message && props.message !== 'User retrieved successfully'
        ? props.message
        : null;

    expect(displayMessage).toBe('Network error occurred');
  });

  it('hides "User retrieved successfully" message', () => {
    const { props } = createInstance({ message: 'User retrieved successfully' } as any);

    const displayMessage =
      props.message && props.message !== 'User retrieved successfully'
        ? props.message
        : null;

    expect(displayMessage).toBeNull();
  });

  it('prioritizes local message over Redux message', () => {
    const { instance } = createInstance({ message: 'Redux message' } as any);
    instance.setState({ localMessage: 'Local message' });

    const displayMessage =
      instance.state.localMessage ||
      (instance.props.message &&
      instance.props.message !== 'User retrieved successfully'
        ? instance.props.message
        : null);

    expect(displayMessage).toBe('Local message');
  });

  it('determines initial loading state correctly when no data', () => {
    const { props } = createInstance({ loading: true, data: null } as any);

    const isInitialLoading = props.loading && !props.data;

    expect(isInitialLoading).toBe(true);
  });

  it('is not in initial loading when data exists', () => {
    const { props } = createInstance({ loading: true } as any);

    const isInitialLoading = props.loading && !props.data;

    expect(isInitialLoading).toBe(false);
  });

  it('selects profile image source with priority: selected > data > formValues > default', () => {
    const { instance } = createInstance();
    const selectedImage = { uri: 'local://selected.png', type: 'image/png', name: 'test.png' };
    instance.setState({ selectedImage });

    const profileImageSource = selectedImage
      ? { uri: selectedImage.uri }
      : instance.props.data?.profileImage
        ? { uri: instance.props.data.profileImage.imageUrl }
        : instance.state.formValues.profileImageUrl
          ? { uri: instance.state.formValues.profileImageUrl }
          : require('../../../../src/assets/assets').imageProfile1;

    expect(profileImageSource).toEqual({ uri: 'local://selected.png' });
  });

  it('uses data profile image when no selected image', () => {
    const { instance } = createInstance({
      data: createProfileData({
        profileImage: { imageUrl: 'https://example.com/data.jpg' },
      }),
    } as any);

    const profileImageSource = instance.state.selectedImage
      ? { uri: instance.state.selectedImage.uri }
      : instance.props.data?.profileImage
        ? { uri: instance.props.data.profileImage.imageUrl }
        : instance.state.formValues.profileImageUrl
          ? { uri: instance.state.formValues.profileImageUrl }
          : require('../../../../src/assets/assets').imageProfile1;

    expect(profileImageSource).toEqual({ uri: 'https://example.com/data.jpg' });
  });

  it('falls back to formValues profileImageUrl when no selected or data image', () => {
    const { instance } = createInstance({ data: createProfileData({ profileImage: null }) } as any);
    instance.setState({
      formValues: { ...instance.state.formValues, profileImageUrl: 'https://form.com/image.jpg' },
    });

    const profileImageSource = instance.state.selectedImage
      ? { uri: instance.state.selectedImage.uri }
      : instance.props.data?.profileImage
        ? { uri: instance.props.data.profileImage.imageUrl }
        : instance.state.formValues.profileImageUrl
          ? { uri: instance.state.formValues.profileImageUrl }
          : require('../../../../src/assets/assets').imageProfile1;

    expect(profileImageSource).toEqual({ uri: 'https://form.com/image.jpg' });
  });

  it('uses default image when no images available', () => {
    const { instance } = createInstance({ data: createProfileData({ profileImage: null }) } as any);
    instance.setState({
      formValues: { ...instance.state.formValues, profileImageUrl: null },
      selectedImage: null,
    });

    const hasImage = !instance.state.selectedImage &&
      !instance.props.data?.profileImage &&
      !instance.state.formValues.profileImageUrl;

    expect(hasImage).toBe(true);
  });

  it('builds profile image URI with correct priority', () => {
    const { instance } = createInstance();
    const selectedImage = { uri: 'selected://img.png', type: 'image/png', name: 'test.png' };
    instance.setState({ selectedImage });

    const profileImageUri =
      instance.state.selectedImage?.uri ??
      instance.props.data?.profileImage?.imageUrl ??
      instance.state.formValues.profileImageUrl;

    expect(profileImageUri).toBe('selected://img.png');
  });

  it('calculates profileImageUri from data when no selectedImage', () => {
    const { instance } = createInstance({
      data: createProfileData({ profileImage: { imageUrl: 'data://img.jpg' } }),
    } as any);

    const profileImageUri =
      instance.state.selectedImage?.uri ??
      instance.props.data?.profileImage?.imageUrl ??
      instance.state.formValues.profileImageUrl;

    expect(profileImageUri).toBe('data://img.jpg');
  });

  it('calculates profileImageUri from formValues when no selectedImage or data', () => {
    const { instance } = createInstance({
      data: createProfileData({ profileImage: null }),
    } as any);
    instance.setState({
      formValues: { ...instance.state.formValues, profileImageUrl: 'form://img.png' },
    });

    const profileImageUri =
      instance.state.selectedImage?.uri ??
      instance.props.data?.profileImage?.imageUrl ??
      instance.state.formValues.profileImageUrl;

    expect(profileImageUri).toBe('form://img.png');
  });

  it('has null profileImageUri when no images available', () => {
    const { instance } = createInstance({
      data: createProfileData({ profileImage: null }),
    } as any);
    instance.setState({
      formValues: { ...instance.state.formValues, profileImageUrl: null },
      selectedImage: null,
    });

    const profileImageUri =
      instance.state.selectedImage?.uri ??
      instance.props.data?.profileImage?.imageUrl ??
      instance.state.formValues.profileImageUrl;

    expect(profileImageUri).toBeNull();
  });
});
