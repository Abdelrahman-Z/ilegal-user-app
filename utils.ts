'use server'
import { cookies } from "next/headers"

export async function setToken(tokenName: string, tokenValue: string, days: number) {
  const cookieStore = await cookies()
  const expirationTimeInMs = Date.now() + (days * 24 * 60 * 60 * 1000)

  cookieStore.set({
    name: tokenName,
    value: tokenValue,
    httpOnly: true,
    expires: new Date(expirationTimeInMs),
    path: "/",
    secure: process.env.NODE_ENV === "production",
  })
}

// Function to remove a token from cookies
export async function removeToken(tokenName: string) {
  const cookieStore = await cookies()
  cookieStore.delete("token")
}

// Function to get a token from cookies by name
export async function getToken(tokenName: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get(tokenName)
  return token?.value
}

export async function validateToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) {
    return false; // If the token is not provided, return false
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/validate-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      return false; // If the response is not OK, return false
    }

    const data = await response.json(); // Parse the response as JSON
    return data.validate === true; // Return the validate property if true, otherwise false
  } catch (error) {
    return false; // If there’s an error (e.g., network issues), return false
  }
}

export async function  formatObjectToMarkdown(obj: Record<string, any>): Promise<string> {
  let result = "";

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      // Check for undefined or null values
      result += `**${key}**\n\n${value}\n\n\n`;
    }
  }

  return result.trim(); // Ensure no trailing newlines
}
