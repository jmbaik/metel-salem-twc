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
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useReducer } from "react";
import { authorsTableData, projectsTableData } from "@/data";
import { useFetchVideoList } from "@/api/videoApi";
import MaterialReactTable from "material-react-table";
import WorshipAdd from "./WorshipAdd";

const actionType = {
  open: "worship-open",
  ie: "worship-ie",
  row: "worship-selected-row",
};

function reducer(state, action) {
  switch (action.type) {
    case actionType.open:
      return { ...state, open: action.open };
    case actionType.ie:
      return { ...state, ie: action.ie };
    case actionType.row:
      console.log("actiontype row: ", action.selectedRow);
      return {
        ...state,
        selectedRow: action.selectedRow,
      };
    default:
      return state;
  }
}

const Worship = () => {
  const { isLoading, data, isError, error, isFetching } = useFetchVideoList();

  const [worshipState, dispatch] = useReducer(reducer, {
    open: false,
    ie: "",
    selectedRow: {},
  });

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

  const onDelete = () => {};

  const handleOpen = () => {
    dispatch({
      type: actionType.open,
      open: !worshipState.open,
    });
  };
  const onAdd = () => {
    // setIe("i");
    // setOpen(true);
    dispatch({
      type: actionType.ie,
      ie: "i",
    });
    dispatch({
      type: actionType.open,
      open: true,
    });
  };

  const handleEditRow = (row) => {
    const original = row.original;
    dispatch({ type: actionType.ie, ie: "e" });
    dispatch({ type: actionType.row, selectedRow: original });
    console.log(original);
  };

  const handleDeleteRow = (row) => {
    console.log(row.original);
  };

  useEffect(() => {
    if (worshipState.ie === "e") {
      dispatch({ type: actionType.open, open: true });
      console.log("worshipstate selectedrow", worshipState.selectedRow);
    }
  }, [worshipState.selectedRow]);

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
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    muiTableHeadCellProps: {
                      align: "center",
                    },
                    size: 120,
                  },
                }}
                columns={columns}
                data={data ?? []}
                getRowId={(row) => row.vid}
                enableEditing
                renderRowActions={({ row, table }) => (
                  <div className="flex gap-1">
                    <Tooltip placement="left" content="Edit" size="sm">
                      <IconButton
                        size="sm"
                        color="green"
                        onClick={() => handleEditRow(row)}
                      >
                        <i className="fa-regular fa-pen-to-square" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="right" content="Delete" size="sm">
                      <IconButton
                        size="sm"
                        color="red"
                        onClick={() => handleDeleteRow(row)}
                      >
                        <i className="fa-solid fa-trash" />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
                state={{
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <WorshipAdd
        open={worshipState.open}
        handleOpen={handleOpen}
        ie={worshipState.ie}
        row={worshipState.selectedRow}
      />
    </>
  );
};

export default Worship;
