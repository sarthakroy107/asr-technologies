/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SquareArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqHandler } from "@/utils/fetch-wrapper";
import { formatDate } from "@/utils/format-date";
import { toast } from "sonner";

export const certficateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  certificateLink: z.string(),
  courseName: z.string(),
  issueDate: z.string(),
});

export const certificatesSchema = z.array(certficateSchema);

export type TCertificate = z.infer<typeof certficateSchema>;

export const columnDef: ColumnDef<TCertificate>[] = [
  {
    id: "serial",
    header: "Sl no",

    cell: ({ row }) => <span>{row.index + 1}.</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => <span>{row.original.courseName}</span>,
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => <span>{formatDate(row.original.issueDate)}</span>,
  },
  {
    accessorKey: "certificateLink",
    header: "Certificate",
    cell: ({ row }) => (
      <Link
        href={row.original.certificateLink}
        target="_blank"
        rel="noreferrer"
        className="group hover:underline flex gap-x-2 items-center "
      >
        <p className="group-hover:text-blue-400">View</p>{" "}
        <SquareArrowUpRight className="group-hover:text-blue-400 w-3 h-3 font-extralight text-muted-foreground" />
      </Link>
    ),
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { mutate, error } = useMutation({
        mutationFn: () =>
          reqHandler({
            method: "delete",
            path: `/certificate/${row.original.id}`,
          }),
        mutationKey: ["certificates"],
        onSuccess: () => {
          toast.dismiss();
          queryClient.invalidateQueries({ queryKey: ["certificates"] });
          toast.success("Certificate deleted");
        },
        onError: () => {
          console.log(error);
          toast.dismiss();
          queryClient.invalidateQueries({ queryKey: ["certificates"] });
          toast.success("Deleted successfully");
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Deleting certificate");
                mutate();
              }}
              className="text-red-400 focus:text-red-400 focus:bg-red-300/20 cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
