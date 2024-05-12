"use client";
import React, { useState } from "react";
import Master from "../components/layout/master";
import { TableHistorySmartGarden } from "../components/smartGarden/TableHistorySmartGarden";
import { useCourse } from "../../../hooks/useCourse";
import { useSmartGarden } from "../../../hooks/useSmartGarden";

interface SmartGardenData {
  data: {
    suhu: number;
    kelembaban: number;
  };
}

export default function SmartGarden() {
  const { dataSmartGarden } = useSmartGarden();

  const evaluateCondition = (data: SmartGardenData) => {
    if (!data || !data.data) return "Data tidak tersedia";

    const { suhu, kelembaban } = data.data;

    // Menambahkan kondisi untuk suhu sangat rendah
    if (suhu < 0) {
      return "Suhu terlalu rendah, tidak perlu menyiram";
    }

    if (suhu >= 28 && suhu <= 36 && kelembaban >= 50 && kelembaban <= 80) {
      return "Kondisi optimal, tidak perlu menyiram";
    } else {
      return "Katup terbuka: siram tanaman";
    }
  };

  // Use the evaluateCondition function to set the garden condition message
  const gardenCondition = evaluateCondition(dataSmartGarden);

  return (
    <Master title="Ujian Kompri - Monitoring Smart Garden ">
      <div className="px-20 py-32">
        <div className="bg-gray-100 grid grid-cols-2 rounded-md ">
          <div className="flex justify-center item-center mx-20 my-10 py-10 bg-gray-300 rounded-md">
            Suhu :{" "}
            {dataSmartGarden !== undefined ? dataSmartGarden?.data?.suhu : ""}
          </div>
          <div className="flex justify-center item-center mx-20 my-10 py-10 bg-gray-300 rounded-md">
            Kelembaban : {dataSmartGarden?.data?.kelembaban}
          </div>
        </div>
        <div className="w-full flex justify-center items-center bg-gray-300 my-4 py-5">
          Kondisi : {gardenCondition}
        </div>
        {/* <div className="w-full flex  items-center my-4 py-5">Riwayat</div> */}
        <div className="w-full flex  items-center my-4 py-5">
          {/* <TableHistorySmartGarden listCourse={getDisplayedCourses()} /> */}
        </div>
      </div>
    </Master>
  );
}
