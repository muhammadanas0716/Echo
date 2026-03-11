import crypto from "crypto";

const BEARER_PREFIX = "bearer ";

function normalizeSecret(value: string | null | undefined) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function getHeaderToken(
  headers: Headers,
  headerNames: string[] = ["authorization"]
) {
  for (const headerName of headerNames) {
    const value = headers.get(headerName);
    if (!value) continue;

    if (headerName.toLowerCase() === "authorization") {
      const trimmed = value.trim();
      if (trimmed.toLowerCase().startsWith(BEARER_PREFIX)) {
        return normalizeSecret(trimmed.slice(BEARER_PREFIX.length));
      }
      return normalizeSecret(trimmed);
    }

    return normalizeSecret(value);
  }

  return null;
}

export function getRequestSecret(
  request: Request,
  options?: { headerNames?: string[]; queryParam?: string }
) {
  const headerToken = getHeaderToken(
    request.headers,
    options?.headerNames
  );
  if (headerToken) return headerToken;

  if (options?.queryParam) {
    try {
      const url = new URL(request.url);
      return normalizeSecret(url.searchParams.get(options.queryParam));
    } catch {
      return null;
    }
  }

  return null;
}

export function isValidSecret(
  provided: string | null,
  expected: string | undefined
) {
  if (!provided || !expected) return false;
  return safeEqual(provided, expected);
}
