import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IProps } from "@/pages";

export const EventPage = memo(function EventPage({ data }: IProps) {
  return (
    <div>
      <h1>Events</h1>
      {data.map(({ description, id, image, title }) => (
        <Link key={id} href={`/events/${id}`}>
          <Image src={image} alt={title} width={100} height={100} />
          <h2>{title}</h2>
          <p>{description}</p>
        </Link>
      ))}
    </div>
  );
})

