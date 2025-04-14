import * as v from "valibot";

export const SignupSchema = v.pipe(
    v.object({
        name: v.optional(
            v.union([
                v.pipe(
                    v.literal(""),
                    v.transform(() => undefined)
                ),
                v.pipe(
                    v.string("Your name must be a string."),
                    v.nonEmpty("Please enter your name."),
                    v.minLength(6, "Your name must be at least 6 characters long or more."),
                ),
            ])
        ),
        email: v.pipe(
            v.string("Your email must be a string."),
            v.email("Please enter a valid email address."),
            v.nonEmpty("Please enter your email address."),
        ),
        password: v.pipe(
            v.string("Your password must be a string."),
            v.nonEmpty("Please enter your password."),
            v.minLength(8, "Your password must be at least 8 characters long."),
            v.maxLength(32, "Your password must be at most 32 characters long."),
            v.regex(/(?=.*[a-z])/, "Your password must contain at least one lowercase letter."),
            v.regex(/(?=.*[A-Z])/, "Your password must contain at least one uppercase letter."),
            v.regex(/(?=.*[0-9])/, "Your password must contain at least one number."),
            v.regex(/(?=.*[!@#$%^&*])/, "Your password must contain at least one special character."),
        ),
        confirmPassword: v.pipe(
            v.string("Your confirm password must be a string."),
            v.nonEmpty("Please enter your confirm password."),
        ),
    }),
    v.forward(
        v.partialCheck(
            [["password"], ["confirmPassword"]],
            (input) => input.password === input.confirmPassword,
            "Your password and confirm password do not match."
        ),
        ["confirmPassword"],
    )
);

export type SignupInput = v.InferInput<typeof SignupSchema>;