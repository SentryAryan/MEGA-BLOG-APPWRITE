import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { login as appwriteLogin } from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../redux/slices/authSlice";
import { getCurrentUser } from "../appwrite/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                email: "",
                password: "",
            }
        }
    );
    const [error, setError] = useState(null);

    const loginHandler = async (data) => {
        setError("");
        try {
            const session = await appwriteLogin(data);
            const userData = await getCurrentUser();
            dispatch(login({ userData }));
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl 
            p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all 
                        duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 mt-8 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(loginHandler)}>
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                        <p className="text-red-600 font-bold">
                            {errors.email?.message}
                        </p>

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                        <p className="text-red-600 font-bold">
                            {errors.password?.message}
                        </p>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}