const mockReplace = jest.fn();

export const mockNavigation = {
  replace: mockReplace,
  navigate: jest.fn(),
  goBack: jest.fn(),
  toggleDrawer: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
};
