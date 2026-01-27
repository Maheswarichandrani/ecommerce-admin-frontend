export type AssetType = 'primary' | 'variant' | 'preview';

export interface Asset {
  id: string;
  url: string | null;
  name: string;
  type: AssetType;
  size?: number;
  uploadedAt?: string;
}