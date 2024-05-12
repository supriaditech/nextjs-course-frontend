import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { TableCourseProps, useCourse } from "../../../../hooks/useCourse";
import { ToastContainer } from "react-toastify";

const TABLE_HEAD = ["No", "Temperatur Suhu", "Kelembaban Tanah", "Created"];

export function TableHistorySmartGarden({ listCourse }: TableCourseProps) {
  console.log(listCourse, "==================");
  const {
    handleOpenDialogDelete,
    openDialogDelete,
    handleDeleteCourse,
    handleDialogEdit,
    openDialogEdit,
    selectedCourse,
  } = useCourse();
  return (
    <Card className=" w-full overflow-scroll rounded-md my-6">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listCourse?.map(
            ({ kodeMataKuliah, matakuliah, ruangan, dosenPengampu }, index) => (
              <tr key={kodeMataKuliah} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {kodeMataKuliah}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matakuliah}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {ruangan}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {dosenPengampu}
                  </Typography>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}
