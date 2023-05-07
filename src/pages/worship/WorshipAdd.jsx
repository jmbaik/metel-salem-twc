import React, { useEffect, useState, useReducer } from "react";
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
  img,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import MNotification from "@/comonents/MNotification";
import { metelUpload } from "@/hooks/useMetelUpload";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteVideo, useSaveVideo } from "@/api/videoApi";
import { v4 as uuidv4 } from "uuid";

const WorshipAdd = ({ ie, open, handleOpen, row }) => {
  const queryClient = useQueryClient();

  const initialValues = {
    churchCode: "",
    vid: "",
    cat: "",
    title: "",
    refer: "",
    speaker: "",
    thumnail: "",
    regId: "",
    updId: "",
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

  const { saveVideo, saveLoading } = useSaveVideo();
  const { deleteVideo, deleteLoading } = useDeleteVideo();
  const [uploadDone, setUploadDone] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const _uuid = uuidv4();
    let fileFullName = "";
    if (ie === "i") {
      fileFullName = `/video/${_uuid}.${fileExt}`;
    } else {
      const withoutExt = file.name.split(".")[0];
      fileFullName = `${withoutExt}.${fileExt}`;
    }
    setUploadFileName(fileFullName);
    metelUpload(file, fileFullName)
      .then((res) => {
        console.log("handlefileinput", file.name);
        setUploadDone(true);
        setValue("thumnail", fileFullName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = handleSubmit((data) => {
    if (!uploadDone) {
      alert("파일 첨부가 되지 않았습니다. 파일을 첨부하여 주시길 바랍니다.");
      return;
    }
    if (ie === "i") {
      setValue("churchCode", "H1001");
    } else {
      console.log("row", row);
    }
    setValue("thumnail", uploadFileName);
    console.log("formdata", data);
    saveVideo(data, {
      onSuccess: () => {
        handleOpen(false);
      },
    });
  });

  useEffect(() => {
    if (open && ie === "i") {
      setUploadDone(false);
      reset(initialValues);
    }
    if (open && ie === "e") {
      console.log("addmodal row is ", row);
      for (const [key, value] of Object.entries(row)) {
        setValue(key, value);
      }
    }
    setValue("churchCode", "H1001");
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
              {...register("churchCode", { value: "H1001" })}
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
              onChange={handleFileInput}
              // error={!uploadDone ? true : false}
            />
            {ie === "e" ? (
              <img
                className="h-16 w-16 rounded-lg shadow-sm shadow-blue-gray-900/50"
                src={`${import.meta.env.VITE_APP_S3_URL}${row.thumnail}`}
                alt="thumnail"
              ></img>
            ) : null}
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
