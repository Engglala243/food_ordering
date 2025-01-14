import { Link } from "react-router-dom";
import { Settings, SquareMenu, SquareUserRound, ChartBar } from "lucide-react";
import { useState } from "react";

const Menu = () => {
  return (
    <>
      <div className="">Menu</div>
    </>
  );
};

const Customers = () => {
  return (
    <>
      <div className="">Customers</div>
    </>
  );
};

const Stats = () => {
  return (
    <>
      <div className="">Stats</div>
    </>
  );
};

const MySettings = () => {
  return (
    <>
      <div className="">Settings</div>
    </>
  );
};

const MainSection = ({ childComp }) => {
  return (
    <>
      <div className="bg-gray-200 w-full rounded-md p-4">{childComp}</div>
    </>
  );
};

const RestaurantDashboard = () => {
  const [childComp, setChildComp] = useState(<Menu />);

  return (
    <>
      <div className="flex flex-row pt-36 px-4 gap-2">
        <div className="flex flex-col gap-2 bg-gray-200 rounded-md p-4">
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Menu />)}
          >
            <SquareMenu />
            Menu
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Customers />)}
          >
            <SquareUserRound />
            Customers
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Stats />)}
          >
            <ChartBar />
            Stats
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<MySettings />)}
          >
            <Settings />
            Settings
          </div>
        </div>
        <MainSection childComp={childComp} />
      </div>
    </>
  );
};

export default RestaurantDashboard;
