import { MenuItem } from "@/types";

interface getMenuItemsByVendorIdProps {
  id: string;
}
export interface getMenuItemsByVendorIdResponse {
  menuItem: MenuItem[];
}

export const getMenuItemsByVendorId = async ({
  id,
}: getMenuItemsByVendorIdProps): Promise<getMenuItemsByVendorIdResponse> => {
  const res = await fetch(`placeholder/getMenuItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error getting list of all vendors");
  } else {
    return res.json();
  }
};
