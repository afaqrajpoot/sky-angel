import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HighScores from './HighScores'; // Adjust path as needed

describe('HighScores Component', () => {
        const mockHandleRestart = jest.fn();
        const highScores = [
                { _id: '1', name: 'Player 1', stars: 5, time: 10 },
                { _id: '2', name: 'Player 2', stars: 5, time: 12 },
                { _id: '3', name: 'Player 3', stars: 3, time: 15 },
        ];

        it('renders the high scores table with sorted and ranked data', () => {
                render(<HighScores highScores={highScores} handleRestart={mockHandleRestart} />);

                const rows = screen.getAllByRole('row');
                expect(rows).toHaveLength(4); // 1 header row + 3 data rows

                const firstRowCells = rows[1].children;
                expect(firstRowCells[0].textContent).toBe('1'); // Rank
                expect(firstRowCells[1].textContent).toBe('Player 1');
                expect(firstRowCells[2].textContent).toBe('5');
                expect(firstRowCells[3].textContent).toBe('10s');
        });

        it('calls handleRestart when the Play Again button is clicked', () => {
                render(<HighScores highScores={highScores} handleRestart={mockHandleRestart} />);

                const button = screen.getByRole('button', { name: /Play Again/i });
                fireEvent.click(button);

                expect(mockHandleRestart).toHaveBeenCalledTimes(1);
        });
});
