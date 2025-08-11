export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // "customer", "vendor", etc.
  createdAt: string; // ISO date string
  updatedAt: string;

  vendorProfile?: VendorProfile;
  orders?: Order[];
  rider?: Rider;
  reviews?: Review[];
  refreshTokens?: RefreshToken[];
}

export interface VendorProfile {
  id: number;
  userId: number;
  restaurantName: string;
  address: string;
  phone: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;

  user?: User;
  menuItems?: MenuItem[];
  orders?: Order[];
  categories?: Category[];
  reviews?: Review[];
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

  menuItems?: MenuItem[];
  vendors?: VendorProfile[];
}

export interface MenuItem {
  id: number;
  vendorId: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;

  vendor?: VendorProfile;
  category?: Category;
  orderItems?: OrderItem[];
}

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: number;
  customerId: number;
  vendorId: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;

  customer?: User;
  vendor?: VendorProfile;
  orderItems?: OrderItem[];
  delivery?: Delivery;
  review?: Review;
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;

  order?: Order;
  menuItem?: MenuItem;
}

export type RiderStatus = "ONLINE" | "OFFLINE";

export type DeliveryStatus =
  | "PENDING"
  | "PICKED_UP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "FAILED";

export interface Rider {
  id: number;
  userId: number;
  phone: string;
  vehicleNo: string;
  imageUrl?: string;
  status: RiderStatus;
  approved: boolean;
  createdAt: string;
  updatedAt: string;

  user?: User;
  deliveries?: Delivery[];
}

export interface Delivery {
  id: number;
  orderId: number;
  riderId: number;
  status: DeliveryStatus;
  trackingCode?: string;
  notes?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;

  order?: Order;
  rider?: Rider;
}

export interface Review {
  id: number;
  orderId: number;
  customerId: number;
  vendorId: number;
  stars: number;
  description?: string;
  createdAt: string;
  updatedAt: string;

  order?: Order;
  customer?: User;
  vendor?: VendorProfile;
}

export interface RefreshToken {
  id: number;
  token: string;
  userId: number;
  createdAt: string;
  expiresAt: string;

  user?: User;
}
