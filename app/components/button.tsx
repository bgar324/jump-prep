interface Props {
  link: string;
  text: string;
}

export default function Button({ link, text }: Props) {
  return (
    <a
      className="rounded-full bg-blue-600 px-5 py-2 text-white font-medium hover:opacity-90 active:opacity-80 transition"
      href={link}
    >
      {text}
    </a>
  );
}
