"use client";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import TagTable from "./DataTable";
import { z } from "zod";
import useStore from "../lib/store";
import { showToast } from "./toastHelper";

// Define the Zod schema for validation with default value for `selecttags`
const dataSchema = z.object({
  id: z.number().int(),
  links: z.string(),
  prefix: z.string(),
  selecttags: z.array(z.string()).default([]),
  selectedTags:z.array(z.string()).default([])
});

export default function UploadModal() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [clientFileName, setClientFileName] = useState<string>("");
  const [clientDataArray, setClientDataArray] = useState<any[]>([]);
  const { setDataArray, removeData, dataArray, setfileName, fileName } = useStore();
 
 
  useEffect(() => {
    // Update client-side states when `fileName` and `dataArray` change
    setClientFileName(fileName);
    setClientDataArray(dataArray);
  }, [fileName, dataArray]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setfileName(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setfileName("");
    removeData();
    router.refresh();
  };

  // Normalize keys to ensure they fit schema expectations
  const normalizeKeys = (data: any) => {
    return data.map((item: any) => {
      const normalizedItem: any = {};
      for (const key in item) {
        const normalizedKey = key.trim().replace(/\s+/g, "").toLowerCase();
        normalizedItem[normalizedKey] = item[key];
      }

      // Ensure `selecttags` is initialized if not present
      if (!normalizedItem.hasOwnProperty("selecttags")) {
        normalizedItem["selecttags"] = [];
      }

      return normalizedItem;
    });
  };

  const convertDataTypes = (data: any) => {
    return data.map((item: any) => ({
      id: parseInt(item.id, 10),
      links: String(item.links),
      prefix: String(item.prefix),
      selecttags: String(item.selecttags)
        .split(",")
        .map((tag) => tag.trim()),
    }));
  };

  const validateData = (data: any) => {
    return data.map((item: any) => {
      try {
        return dataSchema.parse(item);
      } catch (error) {
        console.error("Validation Error:", error);
        showToast("error", "Data validation failed");
        throw new Error("Data validation failed");
      }
    });
  };

  const uploadData = () => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(workSheet);

            const normalizedData = normalizeKeys(json);
            const convertedData = convertDataTypes(normalizedData);
            const validatedData = validateData(convertedData);

            setDataArray(validatedData);
            showToast("success", "Upload successful");
          }
        };
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      showToast("error", "File not supported or data validation failed");
      router.refresh();
    }
  };
  const handleBell = ()=>{
    showToast("info" , " notification off")
  }

  return (
    <main className="flex min-h-screen">
      <div
        className={`w-full flex flex-col h-screen space-y-20 px-4 py-1 overflow-y-auto bg-inherit`}
      >
        <div className="flex items-center justify-between p-4 mb-4">
          <div className="text-xl font-semibold">Upload CSV</div>
          <div className="md:flex hidden items-center space-x-6 cursor-pointer">
            <Bell  onClick={handleBell}/>
            <UserButton />
          </div>
        </div>

        <div className="flex justify-center items-center w-full h-full">
          <div
            className={`w-full lg:w-[42%] p-4 rounded-lg shadow-lg dark:bg-black bg-inherit `}
          >
            <div className="rounded-lg w-full">
              <div
                className="w-full border-dashed border-2 border-gray-300 rounded-lg h-56 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {(!clientFileName) ? (
                  <>
                    <Image
                      src="/excel.png"
                      alt="Base Icon"
                      width={42}
                      height={42}
                    />
                    <p className="mt-3 text-[12px]">
                      Drop your excel sheet here or{" "}
                      <span className="mt-2 text-blue-500 underline">
                        browse
                      </span>
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-green-500">{clientFileName}</p>
                    <button
                      className="z-10 mt-2 text-red-500"
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
              />
            </div>
            <button
              className={`mt-3 w-full py-2 px-4 rounded-lg ${
                clientDataArray.length > 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#836FFF] text-[#f2f2f2] hover:bg-[#836FFF]"
              }`}
              onClick={uploadData}
              disabled={clientDataArray.length > 0}
            >
              {clientDataArray.length > 0 ? "Uploaded" : "Upload"}
            </button>
          </div>
        </div>

        {clientDataArray.length !== 0 && (
          <div className="w-full flex flex-col space-y-6">
            <h1 className="text-3xl text-left  font-bold">Uploads</h1>
            <TagTable />
          </div>
        )}
      </div>
    </main>
  );
}
