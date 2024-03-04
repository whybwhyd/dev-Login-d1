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
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IFormInput {
  name: string;
  id: string | Number;
  email: string;
  phoneNumber: Number;
  role: string;
}
export default function Home() {
  const FormSchema = z.object({
    name: z
      .string({ required_error: "이름을 입력해주세요" })
      .min(2, { message: "2글자 이상으로 입력해주세요" })
      .max(12, { message: "12글자 이하로 입력해주세요" }),
    id: z
      .string()
      .regex(/^[a-z]+[a-z0-9]{5,19}$/g, {
        message: "영어 또는 숫자로 아이디를 구성해주세요",
      })
      .min(5, { message: "12글자 이하로 입력해주세요" })
      .max(12, { message: "5글자 이상으로 입력해주세요" }),
    email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
    phoneNumber: z
      .string()
      .regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, {
        message: "숫자를 입력해주세요",
      })
      .max(12, { message: "12글자 이하로 입력해주세요" }),
    role: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <Card className={cn("w-[380px]", "카드")}>
      <CardHeader>
        <CardTitle>계정을 생성합니다</CardTitle>
        <CardDescription>필수 정보를 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>이름</p>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="홍길동"
            />
            {errors.name?.message && <span>{errors.name?.message}</span>}
          </div>

          <div>
            <p>이메일</p>
            <Input
              id="email"
              {...register("email")}
              placeholder="hello@dev.com"
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </div>

          <div>
            <p>연락처</p>
            <Input
              id="phoneNumber"
              type="number"
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

          <div>
            <Button type="submit">다음 단계로 &#61;&#62;</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
