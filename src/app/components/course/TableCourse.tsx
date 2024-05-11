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
import EditCourse from "./EditCourse";

const TABLE_HEAD = [
  "No",
  "KODE MATAKULLIAH",
  "MATAKULIAH",
  "RUANGAN",
  "DOSEN PENGAMPU",
  "ACTION ",
];

export function TableCourse({ listCourse }: TableCourseProps) {
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
                <td className="p-4 flex gap-4">
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => handleDialogEdit(kodeMataKuliah)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleOpenDialogDelete(kodeMataKuliah)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* delete */}
      <Dialog open={openDialogDelete} handler={handleOpenDialogDelete}>
        <DialogHeader>
          <p className="text-red-500 text-bold">Peringatan</p>
        </DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus data ini !</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpenDialogDelete("")}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDeleteCourse}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 3000, position: "fixed" }} // Setel z-index agar tinggi
        />
      </Dialog>

      {/* edit */}
      <Dialog open={openDialogEdit} handler={handleDialogEdit}>
        <EditCourse selectedCourse={selectedCourse} />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 3000, position: "fixed" }} // Setel z-index agar tinggi
        />
      </Dialog>
    </Card>
  );
}
