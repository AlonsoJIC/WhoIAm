export interface Foto {
  name: string;
  image?: string;
  category: 'languages' | 'frontend' | 'backend' | 'cms' | 'infrastructure' | 'tools';
}
