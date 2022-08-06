import {AuthenticationError} from "apollo-server-express";
import {DecodedIdToken} from "firebase-admin/auth";
import {verifyIdToken} from "../util/auth";

export const ErrBearerTokenNotFound = "bearer token not found";
export const ErrEmailNotVerified = "email not verified";
export const ErrDecodingToken = "error while decoding token";

export interface User{
  id: string
  email: string
}

// To generate a user token follow https://firebase.google.com/docs/reference/rest/auth
// The Firebase ID token needs to be passed as a Bearer token
// in the Authorization HTTP header like this:
// `authorization: Bearer <Firebase ID Token>`.
export async function getUserOrThrowError(authorization: string): Promise<User> {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthenticationError(ErrBearerTokenNotFound);
  }

  const idToken = authorization.split("Bearer ")[1];
  const checkRevoked = true;
  let decoded: DecodedIdToken;
  try {
    decoded = await verifyIdToken(idToken, checkRevoked);
  } catch (error) {
    throw new AuthenticationError(ErrDecodingToken, {error});
  }
  if (decoded.email_verified) {
    return {
      id: decoded.uid,
      email: decoded.email as string,
    };
  }
  throw new AuthenticationError(ErrEmailNotVerified);
}
