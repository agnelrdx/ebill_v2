import '@testing-library/jest-dom';

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  __esModule: true,
}));

beforeEach(() => {
  jest.clearAllMocks();
});
