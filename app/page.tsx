import Image from "next/image";
import Button from "./components/button";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen gap-12">
      <Image
        src="/image.png"
        height={300}
        width={300}
        alt="you have to make it"
      />
      <div className="mx-auto flex flex-row gap-2">
        <Button link="/d-1" text="go to d-1" />
        <Button link="/d-2" text="go to d-2" />
        <Button link="/d-3" text="go to d-3" />
        <Button link="/d-4" text="go to d-4" />
        <Button link="/d-5" text="go to d-5" />
        <Button link="/d-6" text="go to d-6" />
        <Button link="/d-7/frontend" text="go to d-7" />
        <Button link="/d-8/frontend" text="go to d-8" />
        <Button link="/d-9/frontend" text="go to d-9" />
        <Button link="/d-10/frontend" text="go to d-10" />
        <Button link="/d-11/frontend" text="go to d-11" />
        <Button link="/d-12" text="go to d-12" />
        <Button link="/d-13" text="go to d-13" />
        <Button link="/d-14" text="go to d-14" />
      </div>
    </div>
  );
}
