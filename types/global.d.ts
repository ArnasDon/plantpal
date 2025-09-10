interface Species {
  id: string;
  name: string;
  tips: string | null;
  wateringFrequencyDays: number;
}

interface SpeciesForm {
  name: string;
  tips: string[];
  wateringFrequencyDays: number;
}

interface Plant {
  id: string;
  speciesId: string;
  species?: Species;
  userId: string;
  name: string;
  notes: string | null;
  wateringFrequencyOverride: number | null;
  daysSinceLastWatering?: number;
  imageUrl: string;
}

interface PlantForm {
  speciesId: string;
  name: string;
  notes?: string;
  wateringFrequencyOverride?: number;
  imageUrl: string;
}

interface PlantCompanion {
  companionId: string;
  plantId: string;
  companion?: Plant;
  plant?: Plant;
  notes: string;
}

interface CloudinaryImageResult {
  event: string;
  info: {
    id: string;
    batchId: string;
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    asset_folder: string;
    display_name: string;
    original_filename: string;
    path: string;
    thumbnail_url: string;
  };
}

interface CloudinaryImage {
  publicId: string;
  width: number;
  height: number;
  secureURL: string;
  originalFilename: string;
  format: string;
}
