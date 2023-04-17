import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import type { IProps } from "@/pages";

export  function HomePage({ data }: IProps) {
  return (
    <main className={styles.main}>
      {data.map(({ description, id, image, title }) => (
        <div key={id}>
          <Link href={`/events/${id}`}>
            <Image src={image} alt={title} width={200} height={100} />
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        </div>
      ))}
    </main>
  );
}
