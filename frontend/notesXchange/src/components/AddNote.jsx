import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import AddNoteForm from "./AddNoteForm";

function AddNote({ onNotesUpload }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        className="bg-gradient-to-br from-blue-50 via-white to-blue-200"
      >
        <DialogTrigger>
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Upload size={18} />
            Upload New Notes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
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
