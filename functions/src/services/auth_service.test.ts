import {DecodedIdToken} from "firebase-admin/auth";
import {AuthenticationError} from "apollo-server-express";
import * as auth from "../util/auth";
import {
  getUserOrThrowError,
  ErrBearerTokenNotFound,
  ErrEmailNotVerified,
  ErrDecodingToken,
} from "./auth_service";

describe("getUserOrAuthenticationError", () => {
  const checkRevoked = true;
  const userIDMock = "userIDMock";
  const tokenMock = "tokenMock";
  const bearerToken = `Bearer ${tokenMock}`;
  const userNotVerifiedMock = {email_verified: false} as DecodedIdToken;
  const userVerifiedMock = {email_verified: true, uid: userIDMock, email: "a@b.com"} as DecodedIdToken;

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("success", async () => {
    const spy = jest
        .spyOn(auth, "verifyIdToken")
        .mockResolvedValue(userVerifiedMock);

    const user = await getUserOrThrowError(bearerToken);
    expect(user.id).toBe(userVerifiedMock.uid);
    expect(user.email).toBe(userVerifiedMock.email);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(tokenMock, checkRevoked);
  });
  test("bearer token not found - empty input", async () => {
    try {
      await getUserOrThrowError("");
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const message = (error as AuthenticationError).message;
      expect(message).toBe(ErrBearerTokenNotFound);
    }
  });

  test("bearer token not found - not bearer token", async () => {
    try {
      await getUserOrThrowError("NotBearer token");
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const message = (error as AuthenticationError).message;
      expect(message).toBe(ErrBearerTokenNotFound);
    }
  });

  test("email not verified", async () => {
    const spy = jest
        .spyOn(auth, "verifyIdToken")
        .mockResolvedValue(userNotVerifiedMock);

    try {
      await getUserOrThrowError(bearerToken);
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const message = (error as AuthenticationError).message;
      expect(message).toBe(ErrEmailNotVerified);
    }
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(tokenMock, checkRevoked);
  });

  test("error while decoding token", async () => {
    const spy = jest
        .spyOn(auth, "verifyIdToken")
        .mockImplementation(() => {
          throw new Error("mock error");
        });

    try {
      await getUserOrThrowError(bearerToken);
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const message = (error as AuthenticationError).message;
      expect(message).toBe(ErrDecodingToken);
    }
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(tokenMock, checkRevoked);
  });

});
