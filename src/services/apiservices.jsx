
export const login = async (formData) => {
  console.log("API called with:", formData);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Dummy check
      if (
        formData.email === "admin@test.com" &&
        formData.password === "123456"
      ) {
        resolve({
          data: {
            token: "dummy-jwt-token-123",
            user: {
              email: formData.email,
              roleType: "ADMIN",
              userId: 1,
              userName: "Admin User",
              phoneNumber: "9999999999",
              active: true,
              subscribed: true,
              contentLimit: 100,
              twitterLimit: 50,
              otpverified: true,
            },
          },
        });
      } else {
        reject({
          response: {
            status: 401,
            data: {
              message: "Invalid credentials",
            },
          },
        });
      }
    }, 1000); // simulate delay
  });
};

