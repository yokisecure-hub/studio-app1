export interface OptionItem {
  label: string;
  value: string;
  description?: string;
}

export interface PromptState {
  subject: string;
  aspectRatio: string;
  camera: string;
  film: string;
  lighting: string;
  time: string;
  composition: string;
  material: string;
  director: string;
}

export type SectionKey = keyof Omit<PromptState, 'subject'>;