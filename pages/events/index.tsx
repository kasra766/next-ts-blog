import { EventPage as EventPageLayout } from "@/src/components";

interface IProps {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}

export default function EventPage({ data }: IProps) {
  return <EventPageLayout data={data} />;
}

export async function getStaticProps() {
  const { events_categories } = await import("@/data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
