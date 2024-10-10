"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

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
import { TournamentStatus } from "@/types/tournament";

interface TournamentDataFromQuery {
  id: number;
  tournament_name: string;
  start_date: Date;
  game_type: "SOLO" | "DUO" | "TRIOS";
  status: TournamentStatus;
  max_participants: number;
  hosted_by: string;
}

interface TournamentComboboxProps {
  tournaments: TournamentDataFromQuery[] | undefined;
  onAddTournament: (name: string) => void;
}

export function TournamentCombobox({
  tournaments,
  onAddTournament,
}: TournamentComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const [newTournamentName, setNewTournamentName] = React.useState("");

  const handleAddTournament = () => {
    if (newTournamentName.trim()) {
      onAddTournament(newTournamentName.trim());
      setNewTournamentName("");
    }
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
          {value && tournaments
            ? tournaments.find(
                (tournament) => tournament.id.toString() === value,
              )?.tournament_name
            : "Select tournament..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tournament..." />
          <CommandList>
            <CommandEmpty>No tournament found.</CommandEmpty>
            <CommandGroup>
              {tournaments?.map((tournament) => (
                <CommandItem
                  key={tournament.id}
                  value={tournament.id.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? undefined : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tournament.id.toString()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {tournament.tournament_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center p-2">
            <CommandInput
              placeholder="New tournament name..."
              value={newTournamentName}
              onValueChange={setNewTournamentName}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleAddTournament}
              className="ml-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
