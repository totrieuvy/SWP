import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import api from '../../config/axios';
import { auth, googleProvider } from '../../config/firebase';
import Login from '../../page/loginPage/Login';
jest.mock('../../config/axios');
jest.mock('../../config/firebase');
// Mocking matchMedia within the test file
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Login component', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('should render the login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );

    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Or login with Google')).toBeInTheDocument();
  });

  test('should handle login with valid credentials', async () => {
    const mockResponse = { data: { token: 'test-token', role: 'ROLE_ADMIN' } };
    api.post.mockResolvedValueOnce(mockResponse);
  
    const handleLoginSpy = jest.spyOn(Login.prototype, 'handleLogin');
  
    const { getByPlaceholderText, getByText, getByRole } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
  
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
  
    fireEvent.change(usernameInput, { target: { value: 'string' } });
    fireEvent.change(passwordInput, { target: { value: 'string' } });
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      expect(handleLoginSpy).toHaveBeenCalledWith({ username: 'string', password: 'string' });
      expect(api.post).toHaveBeenCalledWith('/api/account/login', { username: 'string', password: 'string' });
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(getByRole('alert')).toHaveTextContent('Đăng nhập thành công');
    });
  
    handleLoginSpy.mockRestore();
  });

  test('should handle login with invalid credentials', async () => {
    const mockError = { response: { status: 403 } };
    api.post.mockRejectedValueOnce(mockError);

    const { getByPlaceholderText, getByText, getByRole } = render(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'invaliduser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/account/login', { username: 'invaliduser', password: 'invalidpassword' });
      expect(localStorage.getItem('token')).toBeNull();
      expect(getByRole('alert')).toHaveTextContent('Sai tên đăng nhập hoặc mật khẩu. Hãy thử lại!');
    });
  });
});