import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppWindowMacIcon } from "lucide-react";
import Image from "next/image";
import avatar from "@/public/avatar.svg";

export function SheetInfo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AppWindowMacIcon
          className="h-5 w-5 cursor-pointer text-gray hover:text-white"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </SheetTrigger>
      <SheetContent
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <SheetHeader>
          <SheetTitle>Research @dnd-kit</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4">

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Status</span>
            <Select defaultValue="todo">
              <SelectTrigger className="w-full" aria-label="Status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="clarification">In Clarification</SelectItem>
                <SelectItem value="changes">Change Requested</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Assign</span>
            <Input
              id="sheet-assign"
              defaultValue="Editor"
              disabled
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Deadline</span>
            <Input
              id="sheet-deadline"
              type="date"
              defaultValue=""
              disabled
              className="flex-1 max-w-xs"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Organization</span>
            <Input
              id="sheet-org"
              defaultValue="Example Org"
              disabled
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Paid</span>
            <div className="flex items-center gap-2">
              <input id="sheet-paid" type="checkbox" disabled />
              <span className="text-sm text-gray-300">Paid</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Videos</span>
            <Input
              id="sheet-videos"
              type="number"
              defaultValue="0"
              disabled
              className="flex-1 max-w-xs"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-300">Price</span>
            <Input
              id="sheet-price"
              type="number"
              defaultValue="0"
              disabled
              className="flex-1 max-w-xs"
            />
          </div>
        </div>
        <div className="px-4">
          <div className="my-3 h-px w-full bg-white/5" />
        </div>

        <div className="flex items-center gap-2 px-4">
          <Image src={avatar} alt="Profile Picture" width={40} height={40} />
          <input
            type="text"
            className="flex-1 border-b border-white/10 outline-none focus-none ring-0 p-2 text-white"
            placeholder="Type your message..."
          />
          <button className="rounded bg-yellow px-4 py-2 text-white">
            Send
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
