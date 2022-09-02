import avetisLogo from "assets/images/avetis-logo.png";
import labTBLogo from "assets/images/LabTB-logo.png";
import toqabanutyunLogo from "assets/images/toqabanutyun-logo.png";

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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </h2>
    </div>
  );
}
