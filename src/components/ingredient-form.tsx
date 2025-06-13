"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ListPlus } from "lucide-react";

const ingredientFormSchema = z.object({
  ingredients: z
    .string()
    .min(3, { message: "Please enter at least one ingredient (minimum 3 characters)." })
    .max(500, { message: "Ingredient list is too long (maximum 500 characters)." }),
});

type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

interface IngredientFormProps {
  onGenerate: (ingredients: string) => Promise<void>;
  isLoading: boolean;
}

export function IngredientForm({ onGenerate, isLoading }: IngredientFormProps) {
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  function onSubmit(data: IngredientFormValues) {
    onGenerate(data.ingredients);
  }

  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="bg-primary/10">
        <div className="flex items-center gap-3">
          <ListPlus className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl text-primary">Your Ingredients</CardTitle>
            <CardDescription className="text-muted-foreground">
              List what you have, and we'll find a recipe!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-primary">Available Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., chicken breast, broccoli, garlic, soy sauce..."
                      className="resize-none min-h-[100px] text-base border-border focus:border-primary focus:ring-primary"
                      {...field}
                      aria-describedby="ingredients-description ingredients-message"
                    />
                  </FormControl>
                  <FormDescription id="ingredients-description" className="text-sm text-muted-foreground">
                    Separate ingredients with commas or new lines.
                  </FormDescription>
                  <FormMessage id="ingredients-message" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 text-base shadow-md transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-ping" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
