import { GetStaticProps, GetStaticPaths } from "next";
import { SingleEvent } from "@/src/components";

interface IProps {
  data: {
    id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
  };
}
export default function Event({ data }: IProps) {
  return <SingleEvent data={data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { allEvents } = await import("@/data/data.json");
  const allPaths = allEvents.map(({ id, city }) => ({
    params: {
      cat: city,
      id,
    },
  }));

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id;
  const cat = params?.cat;

  const { allEvents } = await import("@/data/data.json");

  const data = allEvents.find((ev) => ev.id === id);
  if (!data) {
    return {
      notFound: true,
      redirect: `/event/${cat}`,
    };
  }
  return {
    props: {
      data,
    },
  };
};
