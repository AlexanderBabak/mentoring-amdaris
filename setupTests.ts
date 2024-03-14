import "@testing-library/jest-dom";

global["Request"] = jest.fn();

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});

jest.setTimeout(30000);

jest.useFakeTimers({ advanceTimers: true }).setSystemTime(new Date("2023-05-10"));

const originalDateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  second: "2-digit",
  minute: "2-digit",
  hour: "2-digit",
  hour12: false,
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

jest.spyOn(Intl, "DateTimeFormat").mockImplementation(() => originalDateTimeFormat);
