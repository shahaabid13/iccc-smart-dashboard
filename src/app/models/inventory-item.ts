// models/inventory-item.ts
export interface InventoryItem {
  // Backend fields
  id: number;
  serialNumber: string;
  deviceType: string;
  poles: boolean;
  ecbPresent: boolean;
  placeholder: boolean;
  latitude: string;
  longitude: string;
  status: string;
  locationName: string;
  approachRoad: string;

  // Frontend fields (for compatibility)
  name: string;         // Maps to locationName
  location: string;     // Maps to locationName
  quantity: number;     // Default value
  description?: string; // Optional field if needed
}

// For create/update operations
export type InventoryItemPayload = Omit<InventoryItem, 'id'>;
