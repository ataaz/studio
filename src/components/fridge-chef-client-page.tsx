"use client";

import * as React from "react";
import { useState } from "react";
import { ChefHat, Loader2, Utensils } from "lucide-react";
import { IngredientForm } from "@/components/ingredient-form";
import { RecipeDisplay } from "@/components/recipe-display";
import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { generateRecipe } from "@/ai/flows/generate-recipe";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function FridgeChefClientPage() {
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecipe = async (ingredients: string) => {
    setIsLoading(true);
    setGeneratedRecipe(null);
    try {
      const recipeOutput = await generateRecipe({ ingredients });
      setGeneratedRecipe(recipeOutput);
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message || "Failed to generate recipe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-background selection:bg-accent selection:text-accent-foreground">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-4 shadow-md">
          <ChefHat className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">
          Fridge Chef
        </h1>
        <p className="text-lg text-muted-foreground">
          What culinary masterpiece can we create from your fridge today?
        </p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <IngredientForm onGenerate={handleGenerateRecipe} isLoading={isLoading} />

        {isLoading && (
          <Card className="shadow-lg animate-pulse">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-primary">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Crafting your recipe...
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Our AI chef is whisking up something special for you. Please wait a moment!
            </CardContent>
          </Card>
        )}

        {!isLoading && generatedRecipe && (
            <RecipeDisplay recipe={generatedRecipe} />
        )}
        
        {!isLoading && !generatedRecipe && (
          <Card className="shadow-lg border-dashed border-border">
            <CardContent className="p-10 text-center">
                <Utensils className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">
                    Enter some ingredients above and let our AI chef inspire you!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    For example: "Chicken breast, broccoli, soy sauce, rice"
                </p>
            </CardContent>
          </Card>
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fridge Chef. Cook with what you have!</p>
      </footer>
    </div>
  );
}
