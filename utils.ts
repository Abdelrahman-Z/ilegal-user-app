// Function to set a token in cookies with expiration in days
export function setToken(tokenName: string, tokenValue: string, days: number) {
  const date = new Date();
  // Set the expiration date by adding days
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  // Set the cookie with name, value, and expiration
  document.cookie = `${tokenName}=${tokenValue}; ${expires}; path=/;`;
}

// Function to remove a token from cookies
export function removeToken(tokenName: string) {
  // Set the cookie with an expiration date in the past to remove it
  document.cookie = `${tokenName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Function to get a token from cookies by name
export function getToken(tokenName: string) {
  const name = tokenName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return undefined; // Return null if the token is not found
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

export function formatObjectToMarkdown(obj: Record<string, any>): string {
  let result = "";

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      // Check for undefined or null values
      result += `**${key}**\n\n${value}\n\n\n`;
    }
  }

  return result.trim(); // Ensure no trailing newlines
}
