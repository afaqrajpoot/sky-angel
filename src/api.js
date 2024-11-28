const API_URL = 'http://localhost:3000'
export const register = async (name, stars, time) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stars, time }),
    });
    return response.json();
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};