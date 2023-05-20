export type ValidateDuplicatesResponse = {
  isValid: boolean;
  duplicates: string[];
};

export type Route = {
  path: string;
  method: string;
};
