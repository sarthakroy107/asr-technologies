/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodSchema } from "zod";

type Props<T> =
  | {
      path: string;
      method: "get";
      resValidator?: ZodSchema<T>;
    }
  | {
      path: string;
      method: "post" | "put" | "delete";
      body?: any;
      resValidator?: ZodSchema<T>;
    };
export async function reqHandler<T>(obj: Props<T>): Promise<T> {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${
      // process.env is neccessary for SSR
      obj.path
    }`,
    {
      method: obj.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      body:
        obj.method !== "get" && obj.body ? JSON.stringify(obj.body) : undefined,
    }
  );

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    console.error(`Error response: ${JSON.stringify(errorData)}`);
    throw new Error(`${response.status}: ${errorData.message}`);
  }

  const data = await response.json();

  // If a response validator is provided, parse and validate the data
  if (obj.resValidator) {
    return obj.resValidator.parse(data);
  }

  return data as T;
}
