import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldValues, UseFormRegisterReturn } from "react-hook-form";
//import { IFormInput } from "@/app/page";

type FormProps = {
  register?: UseFormRegisterReturn;
};

export default function RoleSelect(props: FormProps) {
  const { register } = props;
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="역할을 선택해주세요" {...register} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem id="manager" value="관리자">
          관리자
        </SelectItem>
        <SelectItem id="Normal" value="일반사용자">
          일반사용자
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
