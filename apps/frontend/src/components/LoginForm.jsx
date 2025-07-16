import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader } from "lucide-react"
import { useAuth } from "@/contexts/AuthProvider"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters.",
  }),
})

export function LoginForm() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email: "",
    password: ""
    },
  })
  const [errors,setErrors] = useState({});

  async function onSubmit(values) {
    const result = await login(values);
    if(result?.errors) {
    setErrors(result.errors);
    return
    }
    return navigate('/')
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
              <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                  <Input placeholder="noir@admin.com" {...field}/>
                  </FormControl>
                  {errors?.email &&  <p className="text-destructive text-sm">{errors.email[0]}</p>}
                  <FormMessage />
              </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
              <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <Input placeholder="yoursecretpassword" type="password" autoComplete="current-password" {...field}/>
                  </FormControl>
                  <FormMessage />
                  {errors?.password && <FormMessage>{errors.password[0]}</FormMessage>}
              </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full  disabled:bg-primary/45">
            { form.formState.isSubmitting ? <Loader className="animate-spin w-24 h-24" /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
