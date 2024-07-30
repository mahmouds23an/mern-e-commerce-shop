import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import VerticalCardProduct from "../components/VerticalCardProduct";

export default function Home() {
  return (
    <div>
      <CategoryList />
      <Banner />
      <VerticalCardProduct category={"airpodes"} heading={"Top airpodes"} />
      <VerticalCardProduct
        category={"earphones"}
        heading={"Popular earphones"}
      />
      <VerticalCardProduct category={"watches"} heading={"Popular watches"} />
      <VerticalCardProduct category={"mouse"} heading={"Popular mouses"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera section"} />
    </div>
  );
}
