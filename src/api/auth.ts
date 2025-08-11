interface loginProps {
  email: string;
  password: string;
}
interface registerProps {
  email: string;
  password: string;
}

export async function loginUser(values: loginProps) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
}

export async function registerUser(values: registerProps) {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    let message = "Registration failed";

    if (res.status === 409) {
      message = data.message || "Username or email already registered";
    } else if (res.status === 400) {
      message = data.message || "Invalid input data";
    } else if (res.status === 500) {
      message = "Internal server error, please try again later";
    }

    throw new Error(message);
  }

  return data;
}
