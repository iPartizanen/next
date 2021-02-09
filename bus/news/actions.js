// Instruments
import { types } from "./types";

export const newsActions = {
  // Argument 'news' is array of articles
  fillNews: (news) => ({
    type: types.FILL_NEWS,
    payload: news,
  }),
};
