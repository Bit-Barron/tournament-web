import { serverEnv } from "@/utils/env/server";
import * as jose from "jose";

// Create an encryption key from the server's SECRET environment variable
const key = new TextEncoder().encode(serverEnv.SECRET);

export const encrypt = async (value: any): Promise<string | null> => {
  try {
    const text = typeof value === "object" ? JSON.stringify(value) : value;

    const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(text))
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(key);

    return jwe;
  } catch (error) {
    return null;
  }
};

export const decrypt = async <T = string>(
  encryptedText?: string,
): Promise<T | null> => {
  if (typeof encryptedText !== "string") return null;
  try {
    const { plaintext } = await jose.compactDecrypt(encryptedText, key);
    const decrypted = new TextDecoder().decode(plaintext);

    try {
      return JSON.parse(decrypted) as T;
    } catch (error) {
      return decrypted as T;
    }
  } catch (error) {
    return null;
  }
};
