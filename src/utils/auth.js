const isTokenValid = (token) => {
  if (!token || !token.includes('.')) return false;
  
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
    const exp = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() < exp; // Check if the token is still valid
  } catch (error) {
    console.error("Token decoding error:", error);
    return false;
  }
};

export default isTokenValid;
