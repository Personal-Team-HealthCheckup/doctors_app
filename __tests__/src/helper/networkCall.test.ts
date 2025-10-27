const mockGetState = jest.fn(() => ({ Auth: { token: 'redux-token' } }));
const mockGetStoredAuthToken = jest.fn().mockResolvedValue('keychain-token');

jest.mock('../../../src/helper/config', () => ({
  baseURL: 'https://example.com/api',
}));

jest.mock('../../../src/redux/store', () => {
  const mockStore = { getState: mockGetState };
  return {
    __esModule: true,
    default: mockStore,
    store: mockStore,
  };
});

jest.mock('../../../src/helper/authKeychain', () => ({
  __esModule: true,
  getStoredAuthToken: mockGetStoredAuthToken,
}));

const networkCall = require('../../../src/helper/networkCall').default;

describe('networkCall', () => {
  beforeEach(() => {
    mockGetState.mockClear();
    mockGetStoredAuthToken.mockClear();
  });

  it('performs successful network call and returns parsed response', async () => {
    const jsonMock = jest.fn().mockResolvedValue({ success: true });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jsonMock,
      text: jest.fn(),
      blob: jest.fn(),
    } as any);

    const result = await networkCall(
      'test',
      'POST',
      JSON.stringify({ foo: 1 }),
    );

    expect(global.fetch).toHaveBeenCalledWith('https://example.com/api/test', {
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        token: 'redux-token',
      }),
      body: JSON.stringify({ foo: 1 }),
    });
    expect(result.response).toEqual({ success: true });
    expect(result.error).toBeNull();
  });

  it('returns error details when response is not ok', async () => {
    const errorPayload = { message: 'Failure occurred' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(errorPayload),
    } as any);

    const result = await networkCall('fail-endpoint');

    expect(result.response).toBeNull();
    expect(result.error).toBe('Failure occurred');
    expect(result.errorResponse).toEqual(errorPayload);
  });
});
