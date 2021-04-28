interface Window {
  /**
   * Ethereum provider API
   * @see https://docs.metamask.io/guide/ethereum-provider.html#events
   */
  ethereum?: {
    request<T = any>(args: {
      method: string;
      params?: unknown[] | Record<string, unknown>;
    }): Promise<T>;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    isConnected(): boolean;
    isMetaMask?: boolean;
  };
}
