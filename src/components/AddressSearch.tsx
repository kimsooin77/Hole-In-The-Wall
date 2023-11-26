import { StoreType } from "@/interface";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

interface AddressProps {
  setValue: UseFormSetValue<StoreType>;
  register: UseFormRegister<StoreType>;
  errors: FieldErrors<StoreType>;
}

export default function AddressSearch({
  register,
  errors,
  setValue,
}: AddressProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    // 데이터가 도로명 주소인 경우 법정 동과 건물명을 추가해 최종 주소 만듦
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("address", fullAddress);
    setIsOpen(false);
  };
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          주소 (다음 주소 검색 API)
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              readOnly
              placeholder="주소를 검색해주세요."
              {...register("address", { required: true })}
              className="col-span-2 block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setIsOpen((val) => !val)}
              className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white"
            >
              주소 검색
            </button>
          </div>

          {errors?.address?.type === "required" && (
            <p className="pt-2 text-xs text-red-600">필수 입력사항입니다.</p>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
