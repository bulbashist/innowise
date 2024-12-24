export type Character = {
  id: string;
  name: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: {
    name: string;
  };
  image: string;
  episode: Array<{
    name: string;
  }>;
};
