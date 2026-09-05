// models/inventory-item.ts
export interface InventoryItem {
  id: number;
  serialNumber: string;
  deviceType: string;
  poles: boolean | number;       // DB returns 0/1
  ecbPresent: boolean | number;  // DB returns 0/1
  placeholder: boolean | number; // DB returns 0/1
  notified: boolean | number;    // DB returns 0/1 — NOT optional, always present
  latitude: string;
  longitude: string;
  status: string;
  locationName: string;
  approachRoad: string;

  // Frontend compatibility fields
  name: string;
  location: string;
  quantity: number;
  description?: string;
}

export type InventoryItemPayload = Omit<InventoryItem, 'id'>;