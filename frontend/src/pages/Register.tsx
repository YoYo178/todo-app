import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "react-router-dom";
import { useSignupMutation } from "@/hooks/network/auth/useSignupMutation";
import { useEffect } from "react";

const signupSchema = z.object({
    name: z.string().nonempty(),
    email: z.email(),
    password: z.string().min(8)
})

type RegisterForm = z.infer<typeof signupSchema>;

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(signupSchema),
    });

    const signupMutation = useSignupMutation({});
    const location = useLocation();

    const onSubmit = async (data: RegisterForm) => {
        await signupMutation.mutateAsync({ payload: data });
    };

    useEffect(() => {
        if (signupMutation.isIdle)
            return;

        if (!signupMutation.isSuccess)
            alert("Error registering user");
        else
            alert("Register success!");
    }, [signupMutation.isSuccess])

    return (
        <>
            <title>Register | TodoApp</title>
            <div className="h-screen w-screen flex items-center justify-center">
                <Card className="w-[360px]">
                    <CardContent className="py-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" {...register("name")} />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Registering..." : "Register"}
                            </Button>
                        </form>
                        <p className="text-center text-sm mt-4">
                            Already have an account? <Link to="/login" className="text-blue-600" state={{ from: location.pathname }} replace>Login</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};