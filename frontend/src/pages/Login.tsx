import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "react-router-dom";
import { useLoginMutation } from "@/hooks/network/auth/useLoginMutation";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const loginSchema = z.object({
    email: z.email(),
    password: z.string().nonempty()
})

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const location = useLocation();
    const loginMutation = useLoginMutation({ queryKey: ['auth'] });
    const { setAuth } = useAuthContext();

    const onSubmit = async (data: LoginForm) => {
        await loginMutation.mutateAsync({ payload: data })
    };

    useEffect(() => {
        if (loginMutation.isIdle)
            return;

        if (!loginMutation.isSuccess)
            alert("Error logging in");
        else {
            alert("Login success!");
            setAuth(loginMutation.data?.data?.user || null)
        }
    }, [loginMutation.isSuccess])

    return (
        <>
            <title>Login | TodoApp</title>
            <div className="h-screen w-screen flex items-center justify-center">
                <Card className="w-[360px]">
                    <CardContent className="py-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                        <p className="text-center text-sm mt-4">
                            Don't have an account? <Link to="/register" className="text-blue-600" state={{ from: location.pathname }} replace>Register</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};