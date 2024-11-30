"use client";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { reqHandler } from "@/utils/fetch-wrapper";

export default function AddCertPage() {
  //const [date, setDate] = useState<Date | undefined>(new Date());
  const { mutate, isPending } = useMutation({
    mutationKey: ["certificates"],
    mutationFn: async (data: TFormSchema) =>
      reqHandler({
        method: "post",
        path: "/certificate",
        body: data,
      }),
    onSuccess: () => {
      toast.success("Certificate created successfully");
      form.reset({
        name: "",
        course: "",
        date: undefined,
      });
    },
    onError: (error) => toast.error(error.message),
  });

  const form = useForm<TFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      course: "",
      date: undefined,
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: TFormSchema) => {
    mutate(data);
  };

  return (
    <main className="w-full flex flex-col justify-center items-center p-5">
      <div className="w-full md:w-3/4 lg:w-[60%]">
        <h2 className="text-4xl font-bold p-2 mb-8">Create certificate</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-medium text-lg">Name</FormLabel>
                  <Input placeholder="John Doe" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel className="font-medium text-lg">Email</FormLabel>
                  <Input type="email" placeholder="xyz@gmail.com" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel className="font-medium text-lg">Course</FormLabel>
                  <Input
                    placeholder="Full stack developer: Zero to Hero"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel className="font-medium text-lg">
                    Issuing date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Details once submitted can not be modified later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-end gap-x-5">
              <Button
                type="button"
                onClick={() =>
                  form.reset({
                    name: "",
                    course: "",
                    date: undefined,
                  })
                }
                className="mt-8 rounded-full min-w-24"
                variant="outline"
                disabled={isPending}
              >
                Rest
              </Button>
              <Button
                type="submit"
                className="mt-8 w-40 rounded-full"
                variant="default"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create certificate"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

const FormSchema = z.object({
  name: z.string({
    required_error: "A name is required.",
  }),
  email: z.string({
    required_error: "An email is required.",
  }),
  course: z.string({
    required_error: "A course name is required.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

type TFormSchema = z.infer<typeof FormSchema>;
