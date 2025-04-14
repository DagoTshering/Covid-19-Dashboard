"use client"

import { type SignupInput, SignupSchema } from "@/validators/signup-validator";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupUserAction } from "@/actions/signup-user-action";

const SignupForm = () => {
    const form = useForm<SignupInput>({
        resolver: valibotResolver(SignupSchema),
        // Not necessary but if you want to reset your form it is required.
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const {handleSubmit, control, formState, reset, setError } = form;

    const submit = async (values: SignupInput) => {
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        //console.log(values);
        const res = await signupUserAction(values);

        if (res.success){
            reset();
        } else {
            switch (res.statusCode) {
                case 400:
                    const nestedErrors = res.error.nested;

                    for (const key in nestedErrors) {
                        setError(key as keyof SignupInput, {
                            message: nestedErrors[key]?.[0]
                        } )
                    }
                    break;
                case 500:
                default:
                    const error = res.error || "Internal Server Error";
                    setError("confirmPassword", { message: error });
            }
        }
    };

  return <Form {...form}>
    {/* The handleSubmit function will validate our form fields with the SignupSchema and then pass it to actual submit function*/}
    <form onSubmit={handleSubmit(submit)} className="space-y-8 max-w-[400px]" autoComplete="off"> 
        <FormField 
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="e.g Jhon Smith" {...field} />
                    </FormControl>
                    <FormDescription>
                        Optional
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField 
            control={control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="e.g jhon.smith@example.com " {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField 
            control={control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="e.g. ********" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField 
            control={control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="e.g. ********" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" disabled={formState.isSubmitting} className="w-full">Sign up</Button>
    </form>

  </Form>
}

export default SignupForm