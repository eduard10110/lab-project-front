import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuNavbar } from "../../helpers/constants/index";

export default function Menu() {
  const [menuOpened, setMenuOpened] = useState(false);

  const [menuCategoryOpened, setMenuCategoryOpened] = useState([0, 1, 2]);

  const handleArrowClick = (index) => () => {
    menuCategoryOpened.find((elem) => elem === index) >= 0
      ? setMenuCategoryOpened(
          menuCategoryOpened.filter((elem) => elem !== index)
        )
      : setMenuCategoryOpened([...menuCategoryOpened, index]);
  };

  const handleCheckboxChange = () => setMenuOpened(!menuOpened);

  return (
    <div className="header-mobile">
      <div className="hamburger-menu">
        <input
          checked={menuOpened}
          onClick={handleCheckboxChange}
          id="menu__toggle"
          type="checkbox"
        />
        <label className="menu__btn" for="menu__toggle">
          <span></span>
        </label>
        <ul className="menu__box" style={{ marginTop: 30 }}>
          <li>
            {menuNavbar.map(({ subCategories, title }, index) => (
              <div className="menu-categories-item" key={index}>
                <div className="menu-category-header">
                  <div className="menu-item" style={{ display: "flex" }}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={handleArrowClick(index)}
                    >
                      {title}
                    </p>
                    {menuCategoryOpened.find((elem) => elem === index) >= 0 ? (
                      <ArrowDropDownIcon onClick={handleArrowClick(index)} />
                    ) : (
                      <ArrowDropUpIcon onClick={handleArrowClick(index)} />
                    )}
                  </div>
                </div>

                {menuCategoryOpened.find((elem) => elem === index) >= 0 &&
                  subCategories.map(({ path, title }, index2) => (
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "menu-item menu-link-active" : "menu-item"
                      }
                      to={path}
                    >
                      {title}
                    </NavLink>
                  ))}
              </div>
            ))}
          </li>
        </ul>
      </div>

      <div className="menu-lines-closed">
        {menuNavbar.map(({ subCategories, title }) => (
          <div key={title}>
            <div className="circle-white"></div>
            {subCategories.map((elem) => (
              <div className="circle-blue" key={elem.title}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
