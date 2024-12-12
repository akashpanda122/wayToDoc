//import { RadioGroup, RadioGroupItem } from '.';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function RadioGroupDemo() {
    return (
        <RadioGroup defaultValue="no" className="flex items-center gap-x-6 pt-5">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" className="border-gray-600 text-primary" />
                <Label 
                    htmlFor="r1" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
                >
                    Yes
                </Label>
            </div>
            <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="r2" className="border-gray-600 text-primary" />
                <Label 
                    htmlFor="r2" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
                >
                    No
                </Label>
            </div>
        </RadioGroup>
    );
}