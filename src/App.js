import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
// import { useAuthContext } from "../src/pages/Context/AuthContext";
import Routes from "./pages/Routes";

function App() {
  // const { isAppLoading } = useAuthContext();

  // if (isAppLoading)
  //   return (
  //     <>
  //       <div id="loop" className="center"></div>
  //       <div id="bike-wrapper" className="center">
  //         <div id="bike" className="centerBike"></div>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
