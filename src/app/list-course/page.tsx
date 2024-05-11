"use client";
import React, { useState } from "react";
import Master from "../components/layout/master";
import { TableCourse } from "../components/course/TableCourse";
import { Button, Dialog, Input, Spinner } from "@material-tailwind/react";
import { TiPlus } from "react-icons/ti";
import { useCourse } from "../../../hooks/useCourse";
import AddCourse from "../components/course/AddCourse";

// Define the structure of a course object, adjust according to your actual data structure
interface Course {
  kodeMataKuliah: string;
  matakuliah: string;
  ruangan: string;
  dosenPengampu: string;
}

// Type for the comparator property
type ComparatorProp = keyof Course;

// Function parameters should be strongly typed
interface MergeParams {
  left: Course[];
  right: Course[];
  prop: ComparatorProp;
}

interface MergeSortParams {
  array: Course[];
  prop: ComparatorProp;
}
function merge({ left, right, prop }: MergeParams): Course[] {
  let result: Course[] = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    // Convert string to integer if the property is 'kodeMataKuliah'
    const leftVal =
      prop === "kodeMataKuliah"
        ? parseInt(left[indexLeft][prop], 10)
        : left[indexLeft][prop];
    const rightVal =
      prop === "kodeMataKuliah"
        ? parseInt(right[indexRight][prop], 10)
        : right[indexRight][prop];

    if (leftVal < rightVal) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function mergeSort({ array, prop }: MergeSortParams): Course[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge({
    left: mergeSort({ array: left, prop }),
    right: mergeSort({ array: right, prop }),
    prop,
  });
}

function ListCoursePage() {
  const {
    listCourse,
    loading,
    handleOpen,
    isOpenAddCourse,
    handleEntryChange,
    entryCount,
    filterCourse,
    handleShowEntries,
  } = useCourse();
  console.log(listCourse, "sdhnjaksdn");
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

  console.log(sortedCourses, "  sortedCourses");
  const handleMergeSortClick = () => {
    if (listCourse) {
      const sorted = mergeSort({ array: listCourse, prop: "kodeMataKuliah" });
      setSortedCourses(sorted);
    }
  };
  const handleResetSort = () => {
    setSortedCourses([]);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const getDisplayedCourses = () => {
    let activeCourses =
      sortedCourses.length > 0
        ? sortedCourses
        : (filterCourse || []).length > 0
        ? filterCourse
        : listCourse;
    if (searchQuery) {
      activeCourses = activeCourses?.filter((course) => {
        console.log("Inspecting course:", course); // Check what 'course' looks like
        return (
          course.kodeMataKuliah
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.matakuliah.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.ruangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.dosenPengampu.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    console.log("Active courses after filtering:", activeCourses);
    return activeCourses;
  };

  return (
    <Master title="Ujian Kompri - Login ">
      <div className=" flex-col m-20 justify-center items-center py-4">
        <h1 className=" text-center font-bold  text-4xl mb-10">
          Daftar Matakuliah
        </h1>
        {!loading ? (
          <div className=" ">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Input
                  crossOrigin={undefined}
                  size="md"
                  label="Input Entries"
                  onChange={handleEntryChange}
                  value={entryCount}
                />
                <Button onClick={handleShowEntries}>Show</Button>
              </div>
              <div className=" w-full ml-40 grid grid-cols-7 gap-2  item-end justify-end">
                <div className="col-span-7 ">
                  <Input
                    crossOrigin={undefined}
                    size="md"
                    label="Cari data"
                    onChange={handleSearchChange}
                    value={searchQuery}
                  />
                </div>
              </div>
            </div>

            <div className="my-4 w-full justify-end flex items-end gap-4">
              <Button
                size="md"
                className="col-span-2"
                onClick={handleMergeSortClick}
              >
                Merge Sort
              </Button>
              <Button
                size="md"
                className="col-span-2"
                onClick={handleResetSort}
              >
                Reset
              </Button>
            </div>

            <TableCourse listCourse={getDisplayedCourses()} />

            <div className="flex justify-end">
              <Button
                data-ripple-light="true"
                data-dialog-target="dialog"
                onClick={handleOpen}
                className="flex justify-center items-center gap-4 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <TiPlus /> Tambah Matakuliah
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center item-center  h-full my-40">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        <Dialog
          open={isOpenAddCourse}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          className="flex-row justify-center item-center"
        >
          <AddCourse />
        </Dialog>
      </div>
    </Master>
  );
}

export default ListCoursePage;
