import * as admin from "firebase-admin";
import {DecodedIdToken} from "firebase-admin/auth";

export async function verifyIdToken(idToken:string, checkRevoked:boolean): Promise<DecodedIdToken> {
  return await admin
      .auth()
      .verifyIdToken(idToken, checkRevoked);
}
