import { useContext, useEffect, useState } from "react";
import Api from "../service/Api";
import { toast } from "react-toastify";

export interface CourseType {
  kodeMataKuliah: string;
  matakuliah: string;
  ruangan: string;
  dosenPengampu: string;
}

export interface TableCourseProps {
  listCourse: CourseType[] | undefined;
}

interface useCourseProps {
  kode?: string | undefined;
}
const useCourse = ({ kode = "" }: useCourseProps = {}) => {
  const [listCourse, setListCourse] = useState<CourseType[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [isOpenAddCourse, setIsOpenAddCourse] = useState(false);
  const [loadingAddCourse, setLoadingAddCourse] = useState(false);
  const [loadingEditCourse, setLoadingEditCourse] = useState(false);
  const handleOpen = () => setIsOpenAddCourse(!isOpenAddCourse);
  const [filterCourse, setFilteredCourses] = useState<
    CourseType[] | undefined
  >();
  const [entryCount, setEntryCount] = useState("");
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [kodeMatakuliah, setKodeMatakuliah] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<
    CourseType | undefined
  >();

  const handleDialogEdit = (kode: string) => {
    setOpenDialogEdit(!openDialogEdit);
    const course =
      listCourse && listCourse.find((course) => course.kodeMataKuliah === kode);
    setSelectedCourse(course);
  };

  const handleOpenDialogDelete = (kode: string) => {
    setOpenDialogDelete(!openDialogDelete);
    setKodeMatakuliah(kode);
  };
  const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryCount(event.target.value);
  };

  const fetchCourses = async () => {
    setLoading(true);
    setError(null); // Reset error state before new API call

    const api = new Api();
    api.url = "/matakuliah/matakuliah-all";
    try {
      const response = await api.call();
      setListCourse(response.data); // Assuming response.data is the array of courses
    } catch (err) {
      console.error(err);
      setError("Failed to fetch courses"); // Set error message
    } finally {
      setLoading(false); // Ensure loading is false after the API call
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (data: any) => {
    setLoadingAddCourse(true);
    const api = new Api();
    api.url = "/matakuliah/create-matakuliah";
    api.body = data;
    try {
      const response = await api.call();
      if (response.statusCode === 200) {
        await fetchCourses();
        toast.success(response.message);
        setLoadingAddCourse(false);
        window.location.reload();
      } else {
        // Jika statusCode bukan 200, log error dan mungkin menampilkan pesan
        console.error("Failed to add course:", response);
        toast.error(response.message);
        setLoadingAddCourse(false);
      }
    } catch (error) {
      // Menangani kesalahan jika permintaan gagal sepenuhnya
      toast.error(
        "Terjadi kesalahan jaringan atau server saat menambahkan matakuliah."
      );
      setLoadingAddCourse(false);
    }
  };

  //   edit course
  const handleEditCourse = async (data: any) => {
    setLoadingEditCourse(true);
    const requestBody = {
      ...data, // Mengambil semua data dari form
      kodeMataKuliah: kode, // Memastikan kodeMataKuliah selalu diperbarui dari selectedCourse
    };
    console.log(requestBody, "============");
    const api = new Api();
    api.url = "/matakuliah/edit-matakuliah";
    api.body = requestBody;
    try {
      const response = await api.call();
      if (response.statusCode === 200) {
        await fetchCourses();
        toast.success(response.message);
        setLoadingEditCourse(false);
        window.location.reload();
      } else {
        // Jika statusCode bukan 200, log error dan mungkin menampilkan pesan
        console.error("Failed to add course:", response);
        toast.error(response.message);
        setLoadingEditCourse(false);
      }
    } catch (error) {
      // Menangani kesalahan jika permintaan gagal sepenuhnya
      toast.error(
        "Terjadi kesalahan jaringan atau server saat menambahkan matakuliah."
      );
      setLoadingEditCourse(false);
    }
  };

  const handleShowEntries = () => {
    // Konversi entryCount ke integer
    const count = parseInt(entryCount, 10);
    console.log(count);
    // Memeriksa apakah count adalah angka valid
    if (isNaN(count) || count < 1) {
      setFilteredCourses(listCourse);
    } else if (listCourse && count > listCourse.length) {
      toast.error("Input entries anda melebihi batas data");
    } else {
      // Jika count adalah angka valid dan >= 1, filter kursus
      const filteredCourses = listCourse && listCourse.slice(0, count);
      setFilteredCourses(filteredCourses);
    }
  };

  //   fungsi deleted course
  const handleDeleteCourse = async () => {
    const api = new Api();
    api.url = "/matakuliah/delete-matakuliah";
    api.body = { kodeMataKuliah: kodeMatakuliah };
    try {
      const response = await api.call();
      if (response.statusCode === 200) {
        await fetchCourses();
        toast.success(response.message);
        setLoadingAddCourse(false);
        window.location.reload();
      } else {
        // Jika statusCode bukan 200, log error dan mungkin menampilkan pesan
        console.error("Failed delete course:", response);
        toast.error(response.message);
        setLoadingAddCourse(false);
      }
    } catch (error) {
      // Menangani kesalahan jika permintaan gagal sepenuhnya
      toast.error(
        "Terjadi kesalahan jaringan atau server saat menambahkan matakuliah."
      );
      setLoadingAddCourse(false);
    }
  };
  return {
    listCourse,
    loading,
    error,
    handleOpen,
    isOpenAddCourse,
    handleAddCourse,
    loadingAddCourse,
    handleEntryChange,
    entryCount,
    filterCourse,
    handleShowEntries,
    handleOpenDialogDelete,
    openDialogDelete,
    handleDeleteCourse,
    handleDialogEdit,
    openDialogEdit,
    selectedCourse,
    loadingEditCourse,
    handleEditCourse,
  };
};

export { useCourse };
