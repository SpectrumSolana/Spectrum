import { renderHook, act } from '@testing-library/react-hooks';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import { useWallet } from '../../providers/WalletProvider';

// Mock the useWallet hook
jest.mock('../../providers/WalletProvider', () => ({
  useWallet: jest.fn(),
}));

describe('useWalletConnection', () => {
  const mockPublicKey = 'mockPublicKey123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns wallet state and methods', () => {
    const mockConnect = jest.fn();
    const mockDisconnect = jest.fn();
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
      publicKey: mockPublicKey,
      connecting: false,
      disconnecting: false,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    const { result } = renderHook(() => useWalletConnection());

    expect(result.current.connected).toBe(false);
    expect(result.current.publicKey).toBe(mockPublicKey);
    expect(result.current.connect).toBeDefined();
    expect(result.current.disconnect).toBeDefined();
    expect(result.current.formatAddress).toBeDefined();
  });

  it('formats address correctly', () => {
    const mockConnect = jest.fn();
    const mockDisconnect = jest.fn();
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
      publicKey: mockPublicKey,
      connecting: false,
      disconnecting: false,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });
    const { result } = renderHook(() => useWalletConnection());
    const formattedAddress = result.current.formatAddress('mockPublicKey123456789');

    expect(formattedAddress).toBe('mock...6789');
  });

  it('handles connect error', async () => {
    const mockError = new Error('Connection failed');
    const mockConnect = jest.fn().mockRejectedValueOnce(mockError);
    const mockDisconnect = jest.fn();
    
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
      publicKey: mockPublicKey,
      connecting: false,
      disconnecting: false,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    const { result } = renderHook(() => useWalletConnection());

    await act(async () => {
      try {
        await result.current.connect();
      } catch (error) {
        expect(error.message).toBe('Failed to connect to wallet');
      }
    });

    expect(mockConnect).toHaveBeenCalled();
  });

  it('handles disconnect error', async () => {
    const mockError = new Error('Disconnection failed');
    const mockConnect = jest.fn();
    const mockDisconnect = jest.fn().mockRejectedValueOnce(mockError);
    
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
      publicKey: mockPublicKey,
      connecting: false,
      disconnecting: false,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    const { result } = renderHook(() => useWalletConnection());

    await act(async () => {
      try {
        await result.current.disconnect();
      } catch (error) {
        expect(error.message).toBe('Failed to disconnect from wallet');
      }
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('returns empty string for formatAddress when address is empty', () => {
    const mockConnect = jest.fn();
    const mockDisconnect = jest.fn();
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
      publicKey: mockPublicKey,
      connecting: false,
      disconnecting: false,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });
    const { result } = renderHook(() => useWalletConnection());
    const formattedAddress = result.current.formatAddress('');

    expect(formattedAddress).toBe('');
  });
}); 