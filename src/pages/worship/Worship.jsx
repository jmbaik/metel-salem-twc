import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
  Chip,
  Button,
  Dialog,
  Input,
  Checkbox,
  CardFooter,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { authorsTableData, projectsTableData } from "@/data";
import { useFetchVideoList } from "@/api/videoApi";
import MaterialReactTable from "material-react-table";
import WorshipAdd from "./WorshipAdd";

const Worship = () => {
  const { isLoading, data, isError, error, isFetching } = useFetchVideoList();
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "churchCode",
        header: "교회코드",
      },
      {
        accessorKey: "churchName",
        header: "교회",
      },
      {
        accessorKey: "vid",
        header: "코드",
      },
      {
        accessorKey: "cat",
        header: "카타고리",
      },
      {
        accessorKey: "title",
        header: "제목",
      },
      {
        accessorKey: "refer",
        header: "본문",
      },
      {
        accessorKey: "speaker",
        header: "설교자",
      },
      {
        accessorKey: "thumnail",
        header: "이미지",
        Cell: ({ renderCellValue, row }) => {
          return (
            row.original.thumnail && (
              <Avatar
                src={`${import.meta.env.VITE_APP_S3_URL}${
                  row.original.thumnail
                }`}
                // src={`https://metelsoft-store-bucket-v1.s3.ap-northeast-2.amazonaws.com/upload/ccc.jpg`}
                size="sm"
              />
            )
          );
        },
      },
      {
        accessorKey: "updId",
        header: "수정자",
      },
      {
        accessorKey: "updDate",
        header: "최종수정일",
      },
    ],
    []
  );

  const onDelete = () => {
    const keys = Object.keys(rowSelection);
    if (keys.length) {
      console.log(keys[0]);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const onAdd = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-4 p-3">
            <Typography variant="h5">예배 관리</Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="mr-5 flex justify-end gap-4">
              <Button variant="gradient" size="sm" onClick={onAdd}>
                추가
              </Button>
              <Button
                variant="gradient"
                color="red"
                size="sm"
                onClick={onDelete}
              >
                삭제
              </Button>
            </div>
            <div className="mt-5">
              <MaterialReactTable
                columns={columns}
                data={data ?? []}
                enableRowSelection
                getRowId={(row) => row.vid}
                enableMultiRowSelection={false}
                onRowSelectionChange={setRowSelection}
                state={{
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  rowSelection,
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <WorshipAdd open={open} handleOpen={handleOpen} />
    </>
  );
};

export default Worship;
