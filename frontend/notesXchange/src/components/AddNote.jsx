import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddNoteForm from "./AddNoteForm";

function AddNote({ onNotesUpload }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <PlusCircle size={18} />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a new note</DialogTitle>
            <DialogDescription>
              <AddNoteForm closeForm={setOpen} onNotesUpload={onNotesUpload} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNote;
