import Image from "next/image";

export const Avatar = ({ src, alt }) => {
  return (
    <div className="relative w-12 h-12">
      <Image
        src={src || "/images/profile.png"}
        alt={alt}
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
  );
};
