import gravatar from "../config/gravatar";
const QUERY_PARAM = "?s=200&r=pg&d=identicon&f=y";

export const getRandomProfile = async (userId: number): Promise<string> => {
  const res = await gravatar.get(`/avatar/${userId}${QUERY_PARAM}`);
  return res.data;
};
