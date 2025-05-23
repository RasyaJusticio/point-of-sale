import { cn } from '@/lib/utils';
import Fuse from 'fuse.js';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export type ComboboxOptionProps = {
    label?: string;
    value: string | number;
};

export type ComboboxProps = {
    options: ComboboxOptionProps[];
    value?: string | number;
    onChange?: (selectedValue: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    searchNoResults?: string;
};

export default function Combobox({
    options,
    value,
    onChange,
    placeholder = 'Pilih Opsi',
    searchPlaceholder = 'Cari...',
    searchNoResults = 'Opsi tidak ditemukan',
}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number>('');
    const fuse = new Fuse(options, {
        includeScore: true,
        keys: ['label'],
    });

    const isControlled = value !== undefined;

    const currentValue = isControlled ? value : internalValue;

    const setValue = (newValue: string) => {
        if (onChange) onChange(newValue);
        if (!isControlled) setInternalValue(newValue);
    };

    const handleSearch = (value: string, search: string) => {
        if (search === '') return 1;

        const results = fuse.search(search);

        const matchedItem = results.find((result) => result.item.value == value && result.score && result.score < 0.3);

        return matchedItem ? 1 : 0;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {currentValue ? options.find((option) => option.value === currentValue)?.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command filter={handleSearch}>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{searchNoResults}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value.toString()}
                                    onSelect={(currValue) => {
                                        setValue(currValue === String(currentValue) ? '' : String(currValue));
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', currentValue === option.value ? 'opacity-100' : 'opacity-0')} />
                                    {option.label ?? option.value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
