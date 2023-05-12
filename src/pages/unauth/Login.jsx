import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { loginApi } from "@/api/commonApi";
import {
  addUserToSessionStorage,
  getUserFromSessionStorage,
} from "@/utils/sessionStorage";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { adminUserState } from "@/atom/adminUserState";

export default function Login() {
  const user = useRecoilValue(adminUserState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = async (data) => {
    const res = await loginApi(data);
    console.log(res);
    if (res.code === "Error") {
      alert(res.message);
      return;
    }
    const _userData = res.result;
    addUserToSessionStorage(_userData);
    console.log("login result", _userData);
    window.location.replace("/dashboard/home");
  };

  return (
    <>
      {user && <Navigate to="/dashboard/home" replace={true} />}
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                error={Boolean(errors.email ? true : false)}
              />
              <Input
                type="phone"
                label="Phone"
                size="lg"
                {...register("phone", {
                  required: "required",
                })}
                error={Boolean(errors.phone ? true : false)}
              />
              <Input
                type="password"
                label="Password"
                size="lg"
                {...register("password", {
                  required: "required",
                })}
                error={Boolean(errors.password ? true : false)}
              />

              {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Sign In
              </Button>
              {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/register">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography> */}
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
