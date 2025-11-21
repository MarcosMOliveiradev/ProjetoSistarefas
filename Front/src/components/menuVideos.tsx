import { Folder } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function MenuVideos() {
    return (
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="flex flex-col items-center font-medium" value="item1">
                <div className="flex items-center gap-4">
                    <Folder />
                    <AccordionTrigger>
                        COMPRAS
                    </AccordionTrigger>
                </div>
                <AccordionContent>
                    <p>Criando nova ordem de compra</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}