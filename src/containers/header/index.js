/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";
import routes from "routes/routes";
import { useDispatch } from "react-redux";
import { saveTranslationsData } from "store/action-creators/app";

export default function Header() {
  const [languageId, setLanguageId] = useState("arm");
  const dispatch = useDispatch();

  const handleLanguageSelectChange = (e) => setLanguageId(e.target.value);

  useEffect(() => {
    fetch(`/translations/${languageId}.json`).then((res) =>
      res
        .json()
        .then((response) =>
          dispatch(saveTranslationsData(response, languageId))
        )
    );
  }, [languageId]);

  return (
    <div className="header-container-wrapper">
      <Link to={routes.Home} className="header-logo">
        LabTB
      </Link>
      <div className="header-right-content">
        <div className="user-container">
          <select
            value={languageId}
            onChange={handleLanguageSelectChange}
            className="language-select"
          >
            <option value="en">eng</option>
            <option value="arm">arm</option>
          </select>
          <AccountCircleOutlinedIcon />
          <p>admin</p>
        </div>
        <ArrowCircleLeftOutlinedIcon />
      </div>
    </div>
  );
}
