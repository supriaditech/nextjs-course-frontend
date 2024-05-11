import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { useCourse } from "../../../../hooks/useCourse";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

function AddCourse() {
  const {
    handleSubmit,
    formState: { errors, isValid },

    control,
  } = useForm({ mode: "all" });
  const { handleAddCourse, loadingAddCourse } = useCourse({});
  return (
    <Card
      color="transparent"
      shadow={false}
      className="grid place-items-center  overflow-visible " // Simplified grid centering
    >
      <form
        className="w-full p-4 max-w-xs sm:max-w-sm md:max-w-md py-20"
        onSubmit={handleSubmit(handleAddCourse)}
      >
        <div className="flex flex-col gap-4">
          <p className="font-bold text-black text-center text-2xl">
            Tambah Matakuliah
          </p>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Kode Matakuliah
          </Typography>
          <div className=" flex flex-col items-center ">
            <Controller
              control={control}
              name="kodeMataKuliah"
              render={(event) => (
                <Input
                  label="Masukkan Kode Matakuliah"
                  crossOrigin={undefined}
                  onChange={event.field.onChange}
                  value={event.field.value}
                  className="rounded-md"
                  labelProps={{
                    className: " before:rounded-tl-md after:rounded-tr-md",
                  }}
                />
              )}
              rules={{
                required: "Kode matakuliah field are required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Kode matakuliah hanya boleh berisi angka",
                },
              }}
            />
            {errors.kodeMataKuliah && (
              <div className="  flex items-center gap-4 justify-end h-full w-full  ">
                <p className="text-red-500">
                  {errors.kodeMataKuliah?.message as string}
                </p>
                <AiOutlineExclamationCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Matakuliah
          </Typography>
          <div className="relative flex flex-col items-center ">
            <Controller
              control={control}
              name="matakuliah"
              render={(event) => (
                <Input
                  label="Masukkan Nama Matakuliah"
                  crossOrigin={undefined}
                  onChange={event.field.onChange}
                  value={event.field.value}
                  className="rounded-md"
                  labelProps={{
                    className: " before:rounded-tl-md after:rounded-tr-md",
                  }}
                />
              )}
              rules={{ required: "Nama matakuliah field are required" }}
            />
            {errors.matakuliah && (
              <div className="  flex items-center gap-4 justify-end h-full w-full  ">
                <p className="text-red-500">
                  {errors.matakuliah?.message as string}
                </p>
                <AiOutlineExclamationCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Ruangan
          </Typography>
          <div className="relative flex flex-col items-center ">
            <Controller
              control={control}
              name="ruangan"
              render={(event) => (
                <Input
                  label="Masukkan ruangan "
                  crossOrigin={undefined}
                  onChange={event.field.onChange}
                  value={event.field.value}
                  className="rounded-md"
                  labelProps={{
                    className: " before:rounded-tl-md after:rounded-tr-md",
                  }}
                />
              )}
              rules={{ required: "Ruangan field are required" }}
            />
            {errors.ruangan && (
              <div className="  flex items-center gap-4 justify-end h-full w-full  ">
                <p className="text-red-500">
                  {errors.dosenPengampu?.message as string}
                </p>
                <AiOutlineExclamationCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Dosen Pengampu
          </Typography>
          <div className="relative flex flex-col items-center ">
            <Controller
              control={control}
              name="dosenPengampu"
              render={(event) => (
                <Input
                  label="Masukkan Dosen Pengampu"
                  crossOrigin={undefined}
                  onChange={event.field.onChange}
                  value={event.field.value}
                  className="rounded-md"
                  labelProps={{
                    className: " before:rounded-tl-md after:rounded-tr-md",
                  }}
                />
              )}
              rules={{ required: "Dosen Pengampu field are required" }}
            />
            {errors.dosenPengampu && (
              <div className="  flex items-center gap-4 justify-end h-full w-full  ">
                <p className="text-red-500">
                  {errors.dosenPengampu?.message as string}
                </p>
                <AiOutlineExclamationCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
        </div>

        <Button
          className="mt-6 justify-center items-center"
          fullWidth
          type="submit"
          loading={loadingAddCourse}
        >
          Tamba Matakuliah
        </Button>
      </form>
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
    </Card>
  );
}

export default AddCourse;
