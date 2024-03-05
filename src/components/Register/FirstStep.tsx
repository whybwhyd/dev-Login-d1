"use client";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginType } from "@/app/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FirstStepProps {
  errors: FieldErrors<LoginType>;
  register: UseFormRegister<LoginType>;
  nextStepHandler: () => void;
}

export default function FirstStep(props: FirstStepProps) {
  const { errors, register, nextStepHandler } = props;
  return (
    <div>
      <div>
        <label htmlFor="">이름</label>
        <Input type="text" {...register("name")} placeholder="홍길동" />
        {errors.name?.message && <span>{errors.name?.message}</span>}
      </div>
      <div>
        <label>이메일</label>
        <Input type="text" {...register("email")} placeholder="hello@dev.com" />
        {errors.email?.message && <span>{errors.email?.message}</span>}
      </div>
      <div>
        <label htmlFor="">연락처</label>
        <Input
          type="text"
          {...register("phoneNumber")}
          placeholder="01012345678"
        />
        {errors.phoneNumber?.message && (
          <span>{errors.phoneNumber?.message}</span>
        )}
      </div>
      <div>
        <p>역할</p>
        <select {...register("role")}>
          <option value="관리자">관리자</option>
          <option value="일반사용자">일반사용자</option>
        </select>
      </div>

      <Button type="button" onClick={nextStepHandler}>
        다음 단계로 &#61;&#62;
      </Button>
    </div>
  );
}
