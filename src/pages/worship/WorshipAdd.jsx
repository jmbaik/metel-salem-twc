import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Checkbox,
  CardFooter,
  Dialog,
  Select,
  Option,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import MNotification from "@/comonents/MNotification";
import { metelUpload } from "@/hooks/useMetelUpload";

const WorshipAdd = ({ ie, open, handleOpen }) => {
  const initialValues = {
    churchCode: "",
    vid: "",
    cat: "",
    title: "",
    refer: "",
    speaker: "",
    thumnail: "",
    regId: "",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data.thumnail[0]);
    const file = data.thumnail[0];
    const fileExt = file.name.split(".").pop();
    const fileFullName = "/video/h1001-1" + fileExt;
    console.log(fileFullName);
    metelUpload(file, fileFullName)
      .then((res) => {
        console.log("formdata", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (open && ie === "i") {
      reset(initialValues);
    }
  }, [ie, open]);

  return (
    <Dialog
      size="md"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <form onSubmit={onSubmit}>
        <Card className="mx-auto w-full max-w-[48rem]">
          <CardHeader
            floated={false}
            color="blue"
            variant="gradient"
            className="mb-4 grid h-16 place-items-center"
          >
            <Typography variant="h4" color="white">
              예배 동영상 추가
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="교회코드"
              name="churchCode"
              defaultValue={"H1001"}
              size="lg"
              disabled={true}
            />
            <Controller
              name="cat"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
                    <Select
                      label="Category"
                      {...field}
                      error={Boolean(errors.cat) ? true : false}
                    >
                      <Option key="c001" value="c001">
                        주일예배
                      </Option>
                      <Option key="c002" value="c002">
                        찬양예배
                      </Option>
                      <Option key="c003" value="c003">
                        행사/간증
                      </Option>
                      <Option key="c004" value="c004">
                        찬양
                      </Option>
                    </Select>
                  </>
                );
              }}
            />
            <input type="hidden" value="H1001" {...register("churchCode")} />
            <Input
              label="제목"
              name="title"
              size="lg"
              {...register("title", { required: true })}
              error={Boolean(errors.title) ? true : false}
            />
            <Input label="본문" name="refer" size="lg" {...register("refer")} />
            <Input
              label="설교자"
              name="speaker"
              size="lg"
              {...register("speaker")}
            />
            <Input
              type="file"
              name="thumnail"
              label="썸네일"
              size="lg"
              {...register("thumnail", { required: true })}
              error={Boolean(errors.thumnail) ? true : false}
            />
            <Input
              label="등록자"
              size="lg"
              name="regId"
              {...register("regId")}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="flex justify-end gap-5 pt-0">
            <Button variant="gradient" onClick={onSubmit}>
              저장
            </Button>
            <Button variant="gradient" onClick={handleOpen}>
              닫기
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Dialog>
  );
};

export default WorshipAdd;
