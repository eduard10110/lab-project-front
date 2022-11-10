import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { translationsSelector } from "store/selectors/app";

export default function Translation({
  label,
  withContainer,
  containerClassName,
}) {
  const translatedLabel = useSelector(translationsSelector, shallowEqual)[
    label
  ];
  const currentLabel = translatedLabel ? translatedLabel : label;
  return withContainer ? (
    <span className={containerClassName ? containerClassName : ""}>
      {currentLabel}
    </span>
  ) : (
    currentLabel
  );
}
