"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { DiseaseHistory } from "./DiseaseHistory"
import { diseases } from "@/lib/constants/Diseases"

import { skills } from "./data"
import { MeMultiSelect } from "./MeMultiSelect"

const FormSchema = z.object({
    name : z.string().min(5, {
        message : "Name is required"
    }),
    address : z.string({
        message : "Address is required"
    }),
    gender : z.enum(["Male" || "Female"]),
    age : z.number(),
    contactEmail : z.string(),
    contactNumber : z.string(),
    diseaseHistory :z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          category: z.string().optional(),
        })
      )
      .optional(),
})

export function UserForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    name : "",
    address : "",
    age : 0,
    contactEmail : "",
    contactNumber : "",
    diseaseHistory : []
    },
})

function onSubmit(data: z.infer<typeof FormSchema>) {

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <Select
                  onValueChange={(value: string) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="diseaseHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormControl>
                      <MeMultiSelect
                        options={skills}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select the skills you that you have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
           {/* <FormField
                control={form.control}
                name="diseaseHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Disease History</FormLabel>
                    <FormControl>
                      <DiseaseHistory
                        options={diseases}
                        onChange={field.onChange}
                        placeholder="Search diseases..."
                      />
                    </FormControl>
                    <FormDescription>
                      Select the diseases you have encountered.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
         <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name="contactNumber"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        <Button type="submit" className="w-full">Submit</Button>
    </form>
    </Form>
)
}
