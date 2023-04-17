import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import type { IProps } from "@/pages/events/[cat]";

 export const EventCat = memo(function ({ data }: IProps) {
  const router = useRouter();
  const { cat } = router.query;

  return (
    <div>
      <h1>Events in {cat}</h1>
      {data.map(({ city, description, id, image, title }) => (
        <Link key={id} href={`/events/${city}/${id}`}>
          <Image src={image} alt={title} width={300} height={300} />
          <h2>{title}</h2>
          <p>{description}</p>
        </Link>
      ))}
    </div>
  );
})

