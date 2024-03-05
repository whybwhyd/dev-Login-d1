"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FirstStep from "@/components/Register/FirstStep";
import SecondStep from "@/components/Register/SecondStep";

const phoneRegex = new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);

const FormSchema = z
  .object({
    name: z
      .string({ required_error: "이름을 입력해주세요" })
      .min(2, { message: "2글자 이상으로 입력해주세요" })
      .max(12, { message: "12글자 이하로 입력해주세요" }),
    email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
    phoneNumber: z
      .string()
      .regex(phoneRegex, {
        message: "숫자를 입력해주세요",
      })
      .max(12, { message: "12글자 이하로 입력해주세요" }),
    role: z.string(),
    password: z.string().min(8),
    passwordCheck: z.string().min(8),
  })
  .superRefine(({ passwordCheck, password }, ctx) => {
    if (passwordCheck !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password not matched",
        path: ["passwordCheck"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password not matched",
        path: ["password"],
      });
    }
  });

export type LoginType = z.infer<typeof FormSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(FormSchema),
  });
  const [nextStep, setNextStep] = useState(false);
  const nextStepHandler = () => {
    setNextStep(!nextStep);
  };
  return (
    <Card className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[380px] h-[500px]">
      <CardHeader className="flex flex-col space-y-1.5 p-6">
        <CardTitle>계정을 생성합니다</CardTitle>
        <CardDescription>필수 정보를 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          {!nextStep && (
            <FirstStep
              errors={errors}
              register={register}
              nextStepHandler={nextStepHandler}
            />
          )}
          {nextStep && <SecondStep errors={errors} register={register} />}

          {nextStep && (
            <div>
              <Button type="submit">계정등록하기</Button>
              <Button onClick={nextStepHandler}>뒤로가기</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
