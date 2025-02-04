import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const locations = {
  cities: [{ _id: "1", name: "New York" }],
  countries: [{ _id: "2", country: "USA" }],
  hotels: [{ _id: "3", hotel_name: "Hotel One" }],
};

const empty = {
  cities: [],
  countrues: [],
  hotels: [],
};

globalThis.window.DELAY_MS = 0;

const server = setupServer(
  http.get(`http://localhost:3001/locations`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    switch (search) {
      case "success":
        return HttpResponse.json(locations);
      case "fail":
        return HttpResponse.error();
      default:
        return HttpResponse.json(empty);
    }
  }),
);

import App from "./app";

describe("App", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should render search input", () => {
    render(<App />);
    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
  });

  test("should show dropdown item with hotel link", async () => {
    render(<App />);
    const input = screen.getByTestId<HTMLInputElement>("search-input");
    await userEvent.type(input, "success");
    await waitFor(() => expect(input.value).toBe("success"));

    const link = await screen.findByRole("link", { name: "Hotel One" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/hotel/3");
  });
});
