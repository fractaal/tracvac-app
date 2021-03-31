
namespace Express {
  interface Request {
    isAuthenticated: boolean;
    tokenData: {
      isAdministrator: boolean;
      userId: number;
    };
  }
}
