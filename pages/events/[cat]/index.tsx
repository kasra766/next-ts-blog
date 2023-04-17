import { GetStaticProps } from "next";
import { EventCat } from "@/src/components";

export interface IProps {
  data: {
    id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
  }[];
}
export default function Events({ data }: IProps) {
  return <EventCat data={data} />;
}

export async function getStaticPaths() {
  const { events_categories } = await import("@/data/data.json");
  const allPaths = events_categories.map(({ id }) => ({ params: { cat: id } }));

  return {
    paths: allPaths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.cat;

  const { allEvents } = await import("@/data/data.json");
  const data = allEvents.filter((ev) => ev.city === id);

  return {
    props: { data },
  };
};
