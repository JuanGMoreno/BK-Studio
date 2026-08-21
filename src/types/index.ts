export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  year: string;
  description?: string;
  images?: { path: string; type: string }[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}
