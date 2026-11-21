import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <Image
      src="/icons/icon-512.png"
      alt="Bhavya Wade — BW monogram"
      width={64}
      height={64}
      className={className}
    />
  );
}
