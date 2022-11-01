import { NewsCategory } from "./NewsCategory";

export type News = {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  imageName: string;
  createdDate: Date;
  category: NewsCategory;
};
