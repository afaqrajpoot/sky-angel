import { register } from './api';

beforeEach(() => {
        fetch.resetMocks();
});

describe('register API function', () => {
        it('should make a POST request and return the response', async () => {
                const mockResponse = { success: true, id: 1 };
                fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

                const result = await register('Player 1', 5, 10);
                expect(fetch).toHaveBeenCalledWith('http://localhost:3000/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: 'Player 1', stars: 5, time: 10 }),
                });
                expect(result).toEqual(mockResponse);
        });

        it('should throw an error if the API call fails', async () => {
                fetch.mockReject(new Error('API failure'));

                await expect(register('Player 2', 4, 15)).rejects.toThrow('API failure');
        });
});
