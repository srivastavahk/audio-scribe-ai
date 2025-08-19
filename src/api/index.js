import { supabase } from "../lib/supabase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// A helper function to make authenticated requests
const apiRequest = async (endpoint, options = {}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ detail: "An unknown error occurred" }));
    throw new Error(
      errorData.detail || `HTTP error! status: ${response.status}`,
    );
  }

  if (response.status === 204) {
    // No Content
    return null;
  }

  return response.json();
};

// --- Notes API ---
export const getNotes = (page = 1, pageSize = 20) =>
  apiRequest(`/notes/?page=${page}&page_size=${pageSize}`);

export const createNote = (noteData) =>
  apiRequest("/notes/", { method: "POST", body: JSON.stringify(noteData) });

export const updateNote = (noteId, noteData) =>
  apiRequest(`/notes/${noteId}`, {
    method: "PUT",
    body: JSON.stringify(noteData),
  });

export const deleteNote = (noteId) =>
  apiRequest(`/notes/${noteId}`, { method: "DELETE" });

// --- Search API ---
export const searchNotes = (query) =>
  apiRequest(`/notes/search?q=${encodeURIComponent(query)}`);
