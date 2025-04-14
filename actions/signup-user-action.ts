"use server";

import * as v from "valibot";
import { SignupSchema } from "@/validators/signup-validator";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 }

export async function signupUserAction(values: unknown): Promise<Res> {
    // @ts-ignore
    values.email = undefined;
    const parsedValues = v.safeParse(SignupSchema, values);
    if (!parsedValues.success) {
        const flatErrors = v.flatten(parsedValues.issues);
        console.log(flatErrors)
        return { success: false, error: flatErrors, statusCode: 400 };
    }

    const { name, email, password } = parsedValues.output;
    console.log("success", name, email, password);

    try {
        // TODO: Hash password

        // TODO: Save user to database

        return { success: true }

    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500}
    }
 
    
}