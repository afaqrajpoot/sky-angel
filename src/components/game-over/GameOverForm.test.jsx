import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GameOverForm from "./GameOverForm"; // Adjust the import path as needed
import { register } from "../../api";

// Mock the `register` function
jest.mock("../../api", () => ({
        register: jest.fn(),
}));

describe("GameOverForm Component", () => {
        const mockSetHighScores = jest.fn();

        beforeEach(() => {
                jest.clearAllMocks();
        });

        it("renders the form with time, stars, and input", () => {
                render(
                        <GameOverForm setHighScores={mockSetHighScores} time={30} stars={5} />
                );

                // Check if the title, time, and stars are displayed
                expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
                expect(screen.getByText(/30 seconds/i)).toBeInTheDocument();
                expect(screen.getByText(/5/i)).toBeInTheDocument();

                // Check if the input field is present
                expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
        });

        it("updates player name input when typing", () => {
                render(
                        <GameOverForm setHighScores={mockSetHighScores} time={30} stars={5} />
                );

                const input = screen.getByPlaceholderText(/Enter your name/i);
                fireEvent.change(input, { target: { value: "Player 1" } });
                expect(input.value).toBe("Player 1");
        });

        it("submits the form and updates high scores on success", async () => {
                const mockHighScores = [{ id: 1, name: "Player 1", stars: 5, time: 30 }];
                register.mockResolvedValueOnce({ data: mockHighScores });

                render(
                        <GameOverForm setHighScores={mockSetHighScores} time={30} stars={5} />
                );

                const input = screen.getByPlaceholderText(/Enter your name/i);
                fireEvent.change(input, { target: { value: "Player 1" } });

                const button = screen.getByText(/Save Score/i);
                fireEvent.click(button);

                expect(register).toHaveBeenCalledWith("Player 1", 5, 30);

                await waitFor(() => {
                        expect(mockSetHighScores).toHaveBeenCalledWith(mockHighScores);
                });
        });

        it("displays an error message on API failure", async () => {
                register.mockResolvedValueOnce({ data: null });

                render(
                        <GameOverForm setHighScores={mockSetHighScores} time={30} stars={5} />
                );

                const input = screen.getByPlaceholderText(/Enter your name/i);
                fireEvent.change(input, { target: { value: "Player 1" } });

                const button = screen.getByText(/Save Score/i);
                fireEvent.click(button);

                await waitFor(() => {
                        expect(screen.getByText(/Something went wrong, please try again/i)).toBeInTheDocument();
                });
        });

        it("displays a loading spinner while submitting", async () => {
                const mockHighScores = [{ id: 1, name: "Player 1", stars: 5, time: 30 }];
                register.mockResolvedValueOnce({ data: mockHighScores });

                render(
                        <GameOverForm setHighScores={mockSetHighScores} time={30} stars={5} />
                );

                const input = screen.getByPlaceholderText(/Enter your name/i);
                fireEvent.change(input, { target: { value: "Player 1" } });

                const button = screen.getByText(/Save Score/i);
                fireEvent.click(button);

                expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

                await waitFor(() => {
                        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
                });
        });
});
