import { webcrypto as crypto } from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV!;

export async function encrypt(text: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const iv = Buffer.from(ENCRYPTION_IV, "hex");
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    Buffer.from(text)
  );

  return Buffer.from(encrypted).toString("hex");
}

export async function decrypt(encryptedHex: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const iv = Buffer.from(ENCRYPTION_IV, "hex");
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    Buffer.from(encryptedHex, "hex")
  );

  return Buffer.from(decrypted).toString("utf-8");
}
