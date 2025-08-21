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
}

interface PlantForm {
  speciesId: string;
  name: string;
  notes?: string;
  wateringFrequencyOverride?: number;
}
