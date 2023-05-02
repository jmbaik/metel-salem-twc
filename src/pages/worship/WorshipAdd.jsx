import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Checkbox,
  CardFooter,
  Dialog,
  Select,
  Option,
} from "@material-tailwind/react";

const WorshipAdd = ({ open, handleOpen }) => {
  return (
    <Dialog
      size="md"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
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
          <Select label="카타고리" name="cat">
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
              행사/간증
            </Option>
          </Select>
          <Input label="제목" name="title" size="lg" />
          <Input label="본문" name="refer" size="lg" />
          <Input label="설교자" name="speaker" size="lg" />
          <Input label="파일" size="lg" />
          <Input label="등록자" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
              onClick={handleOpen}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default WorshipAdd;
