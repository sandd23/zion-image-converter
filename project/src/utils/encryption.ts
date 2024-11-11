import { Buffer } from 'buffer';

export async function generateKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function encryptFile(file: File, key: CryptoKey): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const arrayBuffer = await file.arrayBuffer();

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    arrayBuffer
  );

  return { encryptedData, iv };
}

export async function exportKey(key: CryptoKey): Promise<ArrayBuffer> {
  return await window.crypto.subtle.exportKey('raw', key);
}

export async function decryptData(
  encryptedData: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> {
  return await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encryptedData
  );
}