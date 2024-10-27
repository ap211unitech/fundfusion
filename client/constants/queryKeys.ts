const CATEGORY_QUERY_KEYS_PREFIX = "@category";

export const CATEGORY_QUERY_KEYS = {
  checkAdmin: (address: string) => [
    CATEGORY_QUERY_KEYS_PREFIX,
    "checkAdmin",
    address,
  ],
};
