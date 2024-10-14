"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { toast } from "sonner";

interface TournamentComboboxProps {
  tournamentId: number;
}

const STATUS = [
  { value: "PENDING", label: "PENDING" },
  { value: "ONGOING", label: "ONGOING" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELED", label: "CANCELED" },
] as const;

type StatusType = (typeof STATUS)[number]["value"];

export function TournamentCombobox({ tournamentId }: TournamentComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { changeTournamentStatus } = TournamentHook();

  const changeStatus = (tournamentId: number, status: StatusType) => {
    changeTournamentStatus
      .mutateAsync({ tournamentId, status: "ONGOING" })
      .then(() => {
        toast.success("Tournament status updated successfully.");
      })
      .catch(() => {
        toast.error("Failed to update tournament status.");
      });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? STATUS.find((framework) => framework.value === value)?.label
            : "Change status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {STATUS.map((status) => {
                return (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={() => changeStatus(tournamentId, status.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === status.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {status.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
