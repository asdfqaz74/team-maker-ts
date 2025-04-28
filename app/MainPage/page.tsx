import GlobalBan from "./components/GlobalBan";
import MostChampion from "./components/MostSwiper/MostChampion";
import Summary from "./components/Summary/Summary";

export default function MainPage() {
  return (
    <div className="flex flex-col">
      <GlobalBan />
      <MostChampion />
      <Summary />
    </div>
  );
}
