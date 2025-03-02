
export default function SearchBar({ query, setQuery, selectedTags, setSelectedTags }: {
  query: string;
  setQuery: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[] | ((prevTags: string[]) => string[])) => void;
}) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags: string[]) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const tags = ["survival", "items", "utility", "mobs", "hard", "difficulty", "magic", "tools", "weapons", "blocks"];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[500px] w-full flex p-3">
        <div className="w-full h-10 border-blueborder border-4 shadow-blueshadow shadow-xl flex items-center px-2 focus-within:ring-2 focus-within:ring-blue-400">
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search here..."
            className="bg-transparent focus:outline-none p-1 w-full"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 items-center justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 border-blueborder border-4 ${selectedTags.includes(tag) ? "bg-blueselected text-bluetext" : "bg-bluebg text-bluetext hover:bg-bluehover"}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};