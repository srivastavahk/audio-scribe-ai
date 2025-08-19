import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { getNotes, searchNotes } from "../api";

import { Button } from "../components/ui/Button";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { Spinner } from "../components/Spinner";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch notes:", error.message);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = async (query) => {
    if (!query) {
      fetchNotes();
      return;
    }
    setLoading(true);
    setIsSearching(true);
    try {
      const results = await searchNotes(query);
      setNotes(results);
      toast.success(`Found ${results.length} notes for "${query}"`);
    } catch (error) {
      toast.error(`Search failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleOpenDeleteConfirm = (noteId) => {
    setNoteToDelete(noteId);
    setIsConfirmOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleSuccess = () => {
    fetchNotes();
    closeModal();
  };

  // Expose search handlers to the Header via context or state management library in a larger app
  // For this scope, we'll assume the SearchBar is part of this page structure.
  // In a real app, `handleSearch` and `fetchNotes` would be lifted to a parent or context.

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={handleOpenCreateModal}>
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center mt-16">
          <Spinner size="lg" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center mt-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">
            {isSearching ? "No Search Results" : "No Notes Yet"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isSearching
              ? "Try a different search term."
              : "Click 'New Note' to get started."}
          </p>
          {isSearching && (
            <Button onClick={fetchNotes} className="mt-4">
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => handleOpenEditModal(note)}
              onDelete={() => handleOpenDeleteConfirm(note.id)}
            />
          ))}
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        note={selectedNote}
        onSuccess={handleSuccess}
      />

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        noteId={noteToDelete}
        onSuccess={fetchNotes}
      />
    </div>
  );
};

export default Dashboard;
