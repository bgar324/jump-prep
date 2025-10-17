"use client";

export default function ChildA({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) {
  return <input value={value} onChange={(e) => setValue(e.target.value)} className= "border"/>;
}
