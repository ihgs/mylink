const mockLocalStorage = jest.spyOn<WindowLocalStorage, "localStorage">(
  window,
  "localStorage",
  "get"
);

const mockImplementation = () => {
  let mockStorage: Record<string, string> = {};
  const mockSetItem = jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
  });

  const mockGetItem = jest.fn((key: string) => {
    return mockStorage[key];
  });

  const mockRemoveItem = jest.fn((key: string) => {
    delete mockStorage[key];
  });

  const originalLocalStorage = { ...window.localStorage } as const;

  mockLocalStorage.mockImplementation(() => {
    return {
      ...originalLocalStorage,
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
    };
  });
};

export { mockLocalStorage, mockImplementation };
