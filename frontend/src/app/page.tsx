"use client";
import {
  certificatesSchema,
  columnDef,
} from "@/components/data-table/column-def";
import { DataTable } from "@/components/data-table/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { reqHandler } from "@/utils/fetch-wrapper";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/loaders/skeleton-loader";

export default function Home() {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () =>
      reqHandler({
        method: "get",
        path: "/certificate",
        resValidator: certificatesSchema,
      }),
  });

  if (isFetching) {
    return (
      <Loader />
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <main className="w-full flex flex-col items-center p-2 md:p-3 lg:p-5 gap-y-7">
      <div className="w-full lg:w-4/5 md:min-w-[850px] flex flex-col md:flex-row justify-start gap-3">
        <CardRender
          title="Certificates"
          contend={data.length}
          description="Total certificates issued"
        />

        <CardRender
          title="Unique users"
          contend={new Set(data.map((d) => d.email)).size}
          description="Total unique users based on email"
        />
      </div>

      <DataTable columns={columnDef} data={data} />
    </main>
  );
}

function CardRender({
  title,
  contend,
  description,
}: {
  title: string;
  description?: string;
  contend: string | number;
}) {
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-2xl md:text-3xl lg:text-4xl">
        {contend}
      </CardContent>
    </Card>
  );
}
