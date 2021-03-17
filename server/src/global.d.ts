
namespace Express {
  interface Request {
    isAuthenticated: boolean;
    tokenData: {
      userId: number
    };
  }
}