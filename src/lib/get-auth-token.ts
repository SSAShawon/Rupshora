
import { authClient } from "./auth-client";

export async function getAuthToken(): Promise<string> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error(
      "Failed to get authentication token. Please login again."
    );
  }

  return data.token;
}
