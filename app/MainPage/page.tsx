import GlobalBan from "./components/GlobalBan";
import MostChampion from "./components/MostChampion";
import Summary from "./components/Summary";

export default function MainPage() {
  return (
    <div className="flex flex-col">
      <GlobalBan />
      <MostChampion />
      <Summary />
    </div>
  );
}
