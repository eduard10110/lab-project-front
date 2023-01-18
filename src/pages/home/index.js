import avetisLogo from "assets/images/avetis-logo.png";
import labTBLogo from "assets/images/LabTB-logo.png";
import toqabanutyunLogo from "assets/images/toqabanutyun-logo.png";
import Translation from "components/translation";

export default function Home() {
  return (
    <div className="home-page-wrapper">
      <div className="logos-wrapper">
        <div className="logos-wrapper-inner">
          <div>
            <img src={labTBLogo} alt="logo" />
          </div>
          <div>
            <img src={avetisLogo} alt="logo" />
          </div>
          <div>
            <img src={toqabanutyunLogo} alt="logo" />
          </div>
        </div>
      </div>
      <h2>
        <Translation label="pageDescription" />
      </h2>
    </div>
  );
}
