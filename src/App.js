import { useState, useEffect, useMemo } from "react";
import hotelData from "./data/properties.json";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadHotelItems();
  }, []);

  const loadHotelItems = async () => {
    const hotelItems = () => JSON.parse(JSON.stringify(hotelData));
    console.log(hotelItems);
    setItems(hotelItems);
  };

  const searchedHotelItems = useMemo(() => {
    return items.filter((item) => {
      return [item.name, item.description]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }, [items, query]);

  return (
    <div>
      <div class="top">
        <div class="search-box">
          <input
            class="s-box"
            placeholder="Search hotel"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div class="container">
        <main class="grid">
          {searchedHotelItems.map((item) => (
            <article>
              <div class="text">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
