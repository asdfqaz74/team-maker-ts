import GlobalBan from "./components/GlobalBan";
import MostChampion from "./components/MostChampion";

export default function MainPage() {
  return (
    <div className="flex flex-col">
      <GlobalBan />
      <MostChampion />
    </div>
  );
}
