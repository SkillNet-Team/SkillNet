// AuthService.js

const AuthService = {
    async signup(userData) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        });
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Failed to sign up');
        }
      } catch (error) {
        throw new Error('Failed to sign up');
      }
    }
  };
  
  export default AuthService;
  