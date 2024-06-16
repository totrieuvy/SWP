import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import api from "config/axios"; // Make sure to import your axios instance
import Login from "page/loginPage/Login";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../config/axios"); // Mock axios

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // your initial store state if needed
    });
  });

  it("should render login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should display validation messages for empty input fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Please input username")).toBeInTheDocument();
      expect(screen.getByText("Please input password")).toBeInTheDocument();
    });
  });

  it("should submit the form with valid staff credentials", async () => {
    const mockResponse = {
      data: {
        token: "dummy_token",
        role: "ROLE_STAFF",
      },
    };

    api.post.mockResolvedValue(mockResponse);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "staff" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "staff" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("dummy_token");
    });

    expect(screen.getByText("Đăng nhập thành công")).toBeInTheDocument();
  });
});
