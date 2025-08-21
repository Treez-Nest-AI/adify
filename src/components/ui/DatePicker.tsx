import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  formatPattern?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  formatPattern = "dd-MM-yyyy",
}: DatePickerProps) {
  // Local state so it works standalone
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
  // State to control popover open/close
  const [isOpen, setIsOpen] = React.useState(false)

  // Sync with external value if parent changes it
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value)
    }
  }, [value])

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange?.(date) // notify parent
    // Close the popover after selection
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, formatPattern) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}