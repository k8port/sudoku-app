// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
	jest.spyOn(console, "warn").mockImplementation((...args) => {
		const message = String(args[0] ?? "");

		if (
			message.includes("React Router Future Flag Warning") ||
			message.includes("Jest did not exit one second after the test run")
		) {
			return;
		}

		originalConsoleWarn(...args);
	});

	jest.spyOn(console, "error").mockImplementation((...args) => {
		const message = String(args[0] ?? "");

		if (
			message.includes("ReactDOMTestUtils.act is deprecated") ||
			message.includes("Warning: `ReactDOMTestUtils.act`")
		) {
			return;
		}

		originalConsoleError(...args);
	});
});

afterAll(() => {
	(console.warn as jest.Mock).mockRestore();
	(console.error as jest.Mock).mockRestore();
});
