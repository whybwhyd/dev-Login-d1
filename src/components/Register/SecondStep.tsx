"use client";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginType } from "@/app/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SecondStepProps {
  errors: FieldErrors<LoginType>;
  register: UseFormRegister<LoginType>;
}

export default function SecondStep(props: SecondStepProps) {
  const { errors, register } = props;
  return (
    <div>
      <div>
        <label htmlFor="">비밀번호</label>
        <Input type="password" {...register("password")} />
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </div>
      <div>
        <label htmlFor="">비밀번호확인</label>
        <Input type="password" {...register("passwordCheck")} />
        {errors.passwordCheck?.message && (
          <span>{errors.passwordCheck?.message}</span>
        )}
      </div>
    </div>
  );
}
