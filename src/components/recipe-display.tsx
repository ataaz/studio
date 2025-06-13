"use client";

import * as React from "react";
import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ListChecks, CookingPot, StickyNote, Salad, UtensilsCrossed } from "lucide-react"; // Added Salad & UtensilsCrossed
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="shadow-xl animate-in fade-in-50 duration-500 w-full">
      <CardHeader className="bg-primary/10">
        <div className="flex items-center gap-3">
          <Salad className="h-10 w-10 text-primary" /> {/* Changed icon */}
          <div>
            <CardTitle className="font-headline text-3xl text-primary">{recipe.recipeName}</CardTitle>
            <CardDescription className="text-muted-foreground">
              A delicious recipe crafted just for you!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Accordion type="multiple" defaultValue={["ingredients", "instructions"]} className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
              <div className="flex items-center gap-2">
                <ListChecks className="h-6 w-6" />
                Ingredients
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <ul className="list-disc list-outside space-y-2 pl-6 text-foreground/90">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-base">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <Separator className="my-4 bg-border/50" />

          <AccordionItem value="instructions">
            <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
              <div className="flex items-center gap-2">
                <CookingPot className="h-6 w-6" />
                Instructions
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <ol className="list-decimal list-outside space-y-3 pl-6 text-foreground/90">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-base leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>

          {recipe.notes && (
            <>
              <Separator className="my-4 bg-border/50" />
              <AccordionItem value="notes">
                <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
                  <div className="flex items-center gap-2">
                    <StickyNote className="h-6 w-6" />
                    Chef's Notes
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <p className="text-base text-foreground/90 italic leading-relaxed">{recipe.notes}</p>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </CardContent>
      <CardFooter className="p-6 bg-secondary/30 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span>Enjoy your meal! Let us know how it turned out.</span>
          </div>
      </CardFooter>
    </Card>
  );
}
