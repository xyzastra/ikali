import { useActionState } from "react";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef } from "react";

// Client-side validation schema (mirrors server-side)
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(5000, { message: "Message must be less than 5000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormState = {
  success: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
  message?: string;
};

const initialState: FormState = {
  success: false,
  errors: {},
};

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const submitContactForm = async (
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    // Client-side validation
    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      return { success: false, errors: fieldErrors };
    }

    try {
      const { data, error } = await supabase.functions.invoke("contact", {
        body: validationResult.data,
      });

      if (error) {
        return {
          success: false,
          errors: {},
          message: error.message || "Failed to submit form",
        };
      }

      if (!data.success) {
        // Handle validation errors from server
        if (data.details) {
          const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
          data.details.forEach((err: { field: string; message: string }) => {
            fieldErrors[err.field as keyof ContactFormData] = err.message;
          });
          return { success: false, errors: fieldErrors, message: data.error };
        }
        return { success: false, errors: {}, message: data.error || "Submission failed" };
      }

      return { success: true, errors: {}, message: data.message };
    } catch (error) {
      return {
        success: false,
        errors: {},
        message: error instanceof Error ? error.message : "Failed to send message",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  // Show toast and reset form on success/error
  useEffect(() => {
    if (state.success) {
      toast({
        title: "Message sent!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-8 py-16 max-w-2xl">
        <SectionHeader
          title="Contact"
          description="Have a question or want to collaborate? Send me a message."
        />

        <form ref={formRef} action={formAction} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              maxLength={100}
              aria-describedby={state.errors.name ? "name-error" : undefined}
              className={state.errors.name ? "border-destructive" : ""}
              disabled={isPending}
            />
            {state.errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {state.errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              maxLength={255}
              aria-describedby={state.errors.email ? "email-error" : undefined}
              className={state.errors.email ? "border-destructive" : ""}
              disabled={isPending}
            />
            {state.errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {state.errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message..."
              rows={6}
              maxLength={5000}
              aria-describedby={state.errors.message ? "message-error" : undefined}
              className={state.errors.message ? "border-destructive" : ""}
              disabled={isPending}
            />
            {state.errors.message && (
              <p id="message-error" className="text-sm text-destructive">
                {state.errors.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
