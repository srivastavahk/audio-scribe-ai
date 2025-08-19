/**
 * A reusable loading spinner component.
 *
 * @param {object} props - The component props.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the spinner.
 * @returns {JSX.Element} The rendered spinner component.
 */
export const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div role="status">
      <div
        className={`animate-spin rounded-full border-solid border-indigo-600 border-t-transparent dark:border-indigo-400 dark:border-t-transparent ${sizeClasses[size]}`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
