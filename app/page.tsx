import Image from "next/image";
import Button from "./components/button";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen gap-12 wrap">
      <Image
        src="/image.png"
        height={300}
        width={300}
        alt="you have to make it"
      />
      <div className="mx-auto grid grid-flow-row grid-cols-6 gap-2">
        <Button link="/d-1" />
        <Button link="/d-2" />
        <Button link="/d-3" />
        <Button link="/d-4" />
        <Button link="/d-5" />
        <Button link="/d-6" />
        <Button link="/d-7/frontend" />
        <Button link="/d-8/frontend" />
        <Button link="/d-9/frontend" />
        <Button link="/d-10/frontend" />
        <Button link="/d-11/frontend" />
        <Button link="/d-12" />
        <Button link="/d-13" />
        <Button link="/d-14" />
        <Button link="/d-15" />
        <Button link="/d-16" />
        <Button link="/d-17" />
        <Button link="/d-18" />
        <Button link="/d-19" />
        <Button link="/d-20" />
        <Button link="/d-21" />
        <Button link="/d-22" />
        <Button link="/d-23" />
      </div>
    </div>
  );
}
