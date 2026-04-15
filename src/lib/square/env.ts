/** Square REST API host (sandbox vs production). Must match the token (sandbox token → sandbox host). */
export function getSquareApiBaseUrl(): string {
  const env = process.env.SQUARE_ENVIRONMENT?.toLowerCase()?.trim();
  if (env === "production" || env === "prod") {
    return "https://connect.squareup.com";
  }
  return "https://connect.squareupsandbox.com";
}

export function hasSquareCredentials(): boolean {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN?.trim());
}
