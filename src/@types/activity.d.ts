import type { ICategory } from "./category";

export interface IActivity {
  id: number;
  name: string;
  slug: string;
  slogan: string;
  description: string;
  minimum_age: number;
  duration: string;
  disabled_access: boolean;
  high_intensity: boolean;
  status: string;
  image_url: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  category: ICategory;
  userRateActivities: IUserRateActivity[];
}

export interface IUserRateActivity {
  grade: number;
  comment: string;
  user_id: number;
  activity_id: number;
  created_at: string;
  updated_at: string;
}
