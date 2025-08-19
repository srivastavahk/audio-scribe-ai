import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createNote, updateNote } from "../api";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const NoteModal = ({ isOpen, onClose, note, onSuccess }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(note);

  useEffect(() => {
    if (isOpen) {
      setContent(note?.content || "");
      setTags(note?.tags?.join(", ") || "");
    }
  }, [note, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      toast.error("Content cannot be empty.");
      return;
    }

    setLoading(true);
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const noteData = { content, tags: tagsArray };

    try {
      if (isEditMode) {
        await updateNote(note.id, noteData);
        toast.success("Note updated successfully!");
      } else {
        await createNote(noteData);
        toast.success("Note created successfully!");
      }
      onSuccess();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Note" : "Create New Note"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags (comma-separated)
          </label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., work, personal, important"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Note"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NoteModal;
