import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, getCurrentUser } from "../appwrite/auth";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
});

function SignUp() {
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
            const user = await createAccount(data);
            const userData = await getCurrentUser();
            dispatch(login({ userData }));
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };