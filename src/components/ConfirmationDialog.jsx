import { toast } from "sonner";
import { deleteNote } from "../api";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useState } from "react";

const ConfirmationDialog = ({ isOpen, onClose, noteId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!noteId) return;
    setLoading(true);
    try {
      await deleteNote(noteId);
      toast.success("Note deleted successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(`Failed to delete note: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this note? This action cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
