/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";

export default function Search() {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchData = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:6001/products/search-details" + query.search
    );
    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchSearchData();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading ...</p>}

      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
}
