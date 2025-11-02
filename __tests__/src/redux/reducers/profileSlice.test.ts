import profileReducer, {
  getProfileAction,
  updateProfileAction,
  AuthDataType,
} from '../../../../src/redux/reducers/profileSlice';
import { configureStore } from '@reduxjs/toolkit';

// Mock networkCall
jest.mock('../../../../src/helper/networkCall', () => {
  return jest.fn();
});

const networkCall = require('../../../../src/helper/networkCall');

describe('profileSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return the initial state', () => {
      const state = profileReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({
        message: null,
        loading: false,
        data: null,
      });
    });
  });

  describe('getProfileAction', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });
    });

    it('should set loading to true when pending', () => {
      const initialState: AuthDataType = {
        message: 'old message',
        loading: false,
        data: null,
      };

      const state = profileReducer(initialState, getProfileAction.pending(''));

      expect(state.loading).toBe(true);
      expect(state.message).toBeNull();
    });

    it('should handle fulfilled action and update user data', async () => {
      const mockUser = {
        _id: '123',
        fullName: 'Dr. John Doe',
        email: 'john@example.com',
        role: 'doctor',
        acceptedTerms: true,
        phoneNumber: '1234567890',
      };

      const mockResponse = {
        user: mockUser,
        message: 'Profile fetched successfully',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockUser);
      expect(state.message).toBe('Profile fetched successfully');
    });

    it('should handle rejected action with error payload', async () => {
      const mockError = {
        message: 'Network error',
        statusCode: 500,
      };

      networkCall.mockResolvedValueOnce({
        response: null,
        error: 'Network error',
        errorResponse: { statusCode: 500 },
      });

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toBeNull();
      expect(state.message).toBe('Network error');
    });

    it('should handle rejected action without error payload', async () => {
      networkCall.mockRejectedValueOnce(new Error('Unexpected error'));

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toBeNull();
      expect(state.message).toBe('Unexpected error');
    });

    it('should handle rejected action with no error message', async () => {
      networkCall.mockRejectedValueOnce({});

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toBeNull();
      expect(state.message).toBeNull();
    });
  });

  describe('updateProfileAction', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });
    });

    it('should set loading to true when pending', () => {
      const initialState: AuthDataType = {
        message: 'old message',
        loading: false,
        data: null,
      };

      const state = profileReducer(
        initialState,
        updateProfileAction.pending('', {} as any),
      );

      expect(state.loading).toBe(true);
      expect(state.message).toBeNull();
    });

    it('should handle fulfilled action with updated user data', async () => {
      const mockUpdatedUser = {
        _id: '123',
        fullName: 'Dr. Jane Smith',
        email: 'jane@example.com',
        role: 'doctor',
        acceptedTerms: true,
        phoneNumber: '9876543210',
      };

      const mockResponse = {
        user: mockUpdatedUser,
        message: 'Profile updated successfully',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      const payload = {
        fullName: 'Dr. Jane Smith',
        phoneNumber: '9876543210',
      };

      await store.dispatch(updateProfileAction(payload));

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockUpdatedUser);
      expect(state.message).toBe('Profile updated successfully');
    });

    it('should handle FormData payload', async () => {
      const mockUpdatedUser = {
        _id: '123',
        fullName: 'Dr. Updated',
        email: 'updated@example.com',
        role: 'doctor',
        acceptedTerms: true,
      };

      const mockResponse = {
        user: mockUpdatedUser,
        message: 'Profile updated with image',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      const formData = new FormData();
      formData.append('fullName', 'Dr. Updated');

      await store.dispatch(updateProfileAction(formData as any));

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockUpdatedUser);
      expect(state.message).toBe('Profile updated with image');
      expect(networkCall).toHaveBeenCalledWith(
        expect.anything(),
        'PATCH',
        formData,
      );
    });

    it('should handle rejected action with error payload', async () => {
      networkCall.mockResolvedValueOnce({
        response: null,
        error: 'Validation error',
        errorResponse: { statusCode: 400 },
      });

      const payload = {
        fullName: '',
      };

      await store.dispatch(updateProfileAction(payload));

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.message).toBe('Validation error');
    });

    it('should handle rejected action without error payload', async () => {
      networkCall.mockRejectedValueOnce(new Error('Server error'));

      const payload = {
        fullName: 'Dr. Test',
      };

      await store.dispatch(updateProfileAction(payload));

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.message).toBe('Server error');
    });

    it('should handle rejected action with no error message', async () => {
      networkCall.mockRejectedValueOnce({});

      const payload = {
        fullName: 'Dr. Test',
      };

      await store.dispatch(updateProfileAction(payload));

      const state = store.getState().profile;
      expect(state.loading).toBe(false);
      expect(state.message).toBeNull();
    });
  });

  describe('reducer edge cases', () => {
    it('should preserve existing state for unrelated actions', () => {
      const initialState: AuthDataType = {
        message: 'test message',
        loading: false,
        data: {
          _id: '123',
          fullName: 'Dr. Test',
          email: 'test@example.com',
          role: 'doctor',
          acceptedTerms: true,
        },
      };

      const state = profileReducer(initialState, { type: 'unrelated/action' });

      expect(state).toEqual(initialState);
    });

    it('should handle multiple pending actions correctly', () => {
      let state: AuthDataType = {
        message: null,
        loading: false,
        data: null,
      };

      state = profileReducer(state, getProfileAction.pending(''));
      expect(state.loading).toBe(true);

      state = profileReducer(state, updateProfileAction.pending('', {} as any));
      expect(state.loading).toBe(true);
      expect(state.message).toBeNull();
    });

    it('should handle user with profile image', async () => {
      const store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });

      const mockUser = {
        _id: '123',
        fullName: 'Dr. John Doe',
        email: 'john@example.com',
        role: 'doctor',
        acceptedTerms: true,
        profileImage: {
          fileId: 'file123',
          imageUrl: 'https://example.com/image.jpg',
        },
      };

      const mockResponse = {
        user: mockUser,
        message: 'Profile fetched successfully',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.data?.profileImage?.imageUrl).toBe(
        'https://example.com/image.jpg',
      );
      expect(state.data?.profileImage?.fileId).toBe('file123');
    });

    it('should handle user with null profile image', async () => {
      const store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });

      const mockUser = {
        _id: '123',
        fullName: 'Dr. John Doe',
        email: 'john@example.com',
        role: 'doctor',
        acceptedTerms: true,
        profileImage: null,
      };

      const mockResponse = {
        user: mockUser,
        message: 'Profile fetched successfully',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.data?.profileImage).toBeNull();
    });

    it('should handle user with userName field', async () => {
      const store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });

      const mockUser = {
        _id: '123',
        fullName: 'Dr. John Doe',
        email: 'john@example.com',
        role: 'doctor',
        acceptedTerms: true,
        userName: 'drjohn123',
      };

      const mockResponse = {
        user: mockUser,
        message: 'Profile fetched successfully',
      };

      networkCall.mockResolvedValueOnce({
        response: mockResponse,
        error: null,
        errorResponse: null,
      });

      await store.dispatch(getProfileAction());

      const state = store.getState().profile;
      expect(state.data?.userName).toBe('drjohn123');
    });
  });

  describe('async thunk console logging', () => {
    it('should log when getProfileAction is called', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      networkCall.mockResolvedValueOnce({
        response: {
          user: {
            fullName: 'Test',
            email: 'test@example.com',
            role: 'doctor',
            acceptedTerms: true,
          },
          message: 'Success',
        },
        error: null,
        errorResponse: null,
      });

      const store = configureStore({
        reducer: {
          profile: profileReducer,
        },
      });

      await store.dispatch(getProfileAction());

      expect(consoleSpy).toHaveBeenCalledWith('getProfileAction called');
      consoleSpy.mockRestore();
    });
  });
});
