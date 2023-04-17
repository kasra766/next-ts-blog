  import { Inter } from "next/font/google";
import { HomePage } from "@/src/components";

const inter = Inter({ subsets: ["latin"] });
export interface IProps {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}
export default function Home({ data }: IProps) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  const { events_categories } = await import("@/data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
