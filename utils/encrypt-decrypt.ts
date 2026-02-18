// Use Web Crypto API (available in modern browsers and Node.js 19+)
const ALGORITHM = 'AES-GCM';
const IV_LENGTH = 12; // Recommended IV length for GCM

// Generate a random key for the session
// We use a promise to ensure the key is ready before encryption
const keyPromise = globalThis.crypto.subtle.generateKey(
  {
    name: ALGORITHM,
    length: 256,
  },
  true, // extractable
  ['encrypt', 'decrypt']
);

// Helper to convert ArrayBuffer to Hex
function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper to convert Hex to ArrayBuffer
function hexToBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}

export async function encrypt(text: string): Promise<string> {
  const key = await keyPromise;
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encodedText = new TextEncoder().encode(text);

  const encryptedBuffer = await globalThis.crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    encodedText
  );

  const ivHex = bufferToHex(iv);
  const encryptedHex = bufferToHex(encryptedBuffer);

  // Return format: IV:EncryptedData (where EncryptedData includes the Auth Tag)
  return `${ivHex}:${encryptedHex}`;
}

export async function decrypt(encryptedData: string): Promise<string> {
  const key = await keyPromise;
  const [ivHex, encryptedHex] = encryptedData.split(':');

  if (!ivHex || !encryptedHex) {
    throw new Error('Invalid encrypted data format');
  }

  const iv = hexToBuffer(ivHex);
  const encryptedBuffer = hexToBuffer(encryptedHex);

  const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    encryptedBuffer
  );

  return new TextDecoder().decode(decryptedBuffer);
}
