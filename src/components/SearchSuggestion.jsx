const SearchSuggestion = ({ visible, data, focusIndex }) => {
  if (!visible) return null;

  return (
    <div className="w-[480px] rounded-sm absolute top-[69px] bg-white">
      {data.map((item, index) => {
        return (
          <p
            key={item}
            className={
              (index === focusIndex ? "bg-slate-500 text-white" : "") +
              " px-2 py-1"
            }
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default SearchSuggestion;
