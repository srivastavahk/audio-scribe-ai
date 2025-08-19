import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <div>
        <h3 className="text-lg font-bold mb-2 truncate">{note.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-4">
          {note.content}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          aria-label={`Edit note titled ${note.title}`}
        >
          <FilePenLine className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          aria-label={`Delete note titled ${note.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;
