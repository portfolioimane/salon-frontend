// src/types/service.ts
export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  duration: number;
  category?: string | null;
  featured?: boolean;
}
