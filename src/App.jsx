import React, { useEffect, useState } from "react";
import "./App.css";
import SearchSuggestion from "./components/SearchSuggestion";

const App = () => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [data, setData] = useState([]);

  const handleKeyDown = (e) => {
    // console.log(e.key);

    let index;

    const acceptedKeys = ["ArrowDown", "ArrowUp", "Backspace", "Enter"];
    if (!acceptedKeys.includes(e.key)) {
      return;
    }
    if (e.key === "Enter") {
      if (focusIndex >= 0) {
        setText(data[focusIndex]);
        index = -1;
        setVisible(false);
      }
    } else if (e.key === "ArrowDown") {
      index = (focusIndex + 1) % data.length;
    } else if (e.key === "ArrowUp") {
      index = (focusIndex + data.length - 1) % data.length;
    } else if (e.key === "Backspace") {
      index = -1;
    }
    setFocusIndex(index);
  };

  const getData = async () => {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=" +
        text
    );
    const res = await data.json();
    setData(res[1]);
  };

  //console.log(data);

  useEffect(() => {
    const timmer = setTimeout(() => {
      getData();
    }, 400);
    return () => {
      clearTimeout(timmer);
    };
  }, [text]);

  return (
    <div className="w-screen min-h-[100vh] bg-gray-900 flex justify-center items-center">
      <div className="-translate-y-24 relative flex items-center justify-center">
        <div className="w-[500px]">
          <h1 className="text-white text-3xl text-center">Typeahead Search</h1>
          <input
            type="text"
            className="w-full py-1 px-2 rounded-r-3xl rounded-l-3xl outline-none"
            placeholder="Search here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          />
        </div>
        <SearchSuggestion
          visible={visible}
          data={data}
          focusIndex={focusIndex}
        />
      </div>
    </div>
  );
};

export default App;
