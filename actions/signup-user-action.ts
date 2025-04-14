"use server";

import * as v from "valibot";
import { SignupSchema } from "@/validators/signup-validator";
import argon2 from "argon2";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };

export async function signupUserAction(values: unknown): Promise<Res> {

    // @ts-ignore
    //values.email = undefined;

    //console.log(values);

    const parsedValues = v.safeParse(SignupSchema, values);
    if (!parsedValues.success) {
        const flatErrors = v.flatten(parsedValues.issues);
        console.log(flatErrors)
        return { success: false, error: flatErrors, statusCode: 400 };
    }

    const { name, email, password } = parsedValues.output;
    console.log("success", name, email, password);

    try {
        //throw Error("Forcing an error");

        // TODO: Hash password
        const hashedPassword = await argon2.hash(password);
        console.log({name, email, password: hashedPassword});
        // TODO: Save user to database

        return { success: true }

    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500}
    }
 
    
}