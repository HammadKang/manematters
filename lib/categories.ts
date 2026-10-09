import { IMG, unsplash } from "./images";

export type CategorySlug = "curly-hair" | "straight-hair" | "hair-fall";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}[] = [
  {
    slug: "curly-hair",
    name: "Curly Hair",
    description: "Define, hydrate and tame your curls with routines and remedies that actually work.",
    image: unsplash(IMG.curly),
  },
  {
    slug: "straight-hair",
    name: "Straight Hair",
    description: "Keep straight hair smooth, shiny and full of body without the greasy roots.",
    image: unsplash(IMG.straight),
  },
  {
    slug: "hair-fall",
    name: "Hair Fall",
    description: "Understand why hair falls and what you can do about it, step by step.",
    image: unsplash(IMG.hairFall),
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
