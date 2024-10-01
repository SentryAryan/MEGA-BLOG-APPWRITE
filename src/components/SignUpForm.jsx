import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, getCurrentUser } from "../appwrite/auth";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../redux/slices/authSlice";
import Logo from "./Logo";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
});

function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                email: "",
                password: "",
                name: "",
            }
        }
    );
    const [error, setError] = useState(null);

    const signupHandler = async (data) => {
        setError("");
        try {
            await createAccount(data);
            const userData = await getCurrentUser();
            dispatch(login({ userData }));
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl 
            p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to your account
                </h2>

                <p>
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all 
                        duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 mt-8 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(signupHandler)}>
                    <div className="space-y-5">

                        <Input
                            label="Full Name: "
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                        <p className="text-red-600 font-bold">
                            {errors.name?.message}
                        </p>

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
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm;