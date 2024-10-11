import { proxy } from "valtio";

export type HomeStore = typeof HomeStore;

export const HomeStore = proxy({
  tournamentId: "",
  brawlStarsId: "",
  username: "",
});
