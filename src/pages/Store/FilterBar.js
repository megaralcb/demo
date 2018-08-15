import React from "react";

//Deps
import classNames from "classnames";

const FilterBar = props => {
  const {
    activeFilter,
    changeFilter,
    deviceType,
    filterBarIsExpanded,
    path,
    toggleFilterBar
  } = props;

  //Filter Classes
  const filterBarContainer = classNames({
    filterBarContainer: true
  });
  const filterBarTitle = classNames({
    filterBarTitle: true,
    activeFilter: activeFilter !== "all",
    isExpanded: filterBarIsExpanded,
    isMobile: deviceType === "mobile"
  });
  const filterIcon = classNames({
    filterIcon: true,
    isExpanded: filterBarIsExpanded
  });

  //TODO: *** CHANGE PATH TO /store FOR PROD *** //
  const filterBar = classNames({
    filterBar: true,
    active: path === "/",
    isExpanded: filterBarIsExpanded,
    isMobile: deviceType === "mobile"
  });
  //TODO: *** CHANGE PATH TO /store FOR PROD *** //

  const filterAll = classNames({
    active: activeFilter === "all",
    isExpanded: filterBarIsExpanded,
    filter: true,
    filterAll: true
  });
  const filterOriginals = classNames({
    active: activeFilter === "original",
    isExpanded: filterBarIsExpanded,
    filter: true,
    filterOriginals: true
  });
  const filterLimitedRun = classNames({
    active: activeFilter === "limitedRun",
    isExpanded: filterBarIsExpanded,
    filter: true,
    filterlimitedRun: true
  });
  const filterPosters = classNames({
    active: activeFilter === "poster",
    isExpanded: filterBarIsExpanded,
    filter: true,
    filterPosters: true
  });
  const filterDiscounts = classNames({
    active: activeFilter === "discount",
    isExpanded: filterBarIsExpanded,
    filter: true,
    filterDiscounts: true
  });

  const filterDisplay = {
    all: "all",
    original: "originals",
    limitedRun: "limited run",
    poster: "posters",
    discount: "discounts"
  };

  return (
    <div className={filterBarContainer}>
      <div className={filterBarTitle} onClick={() => toggleFilterBar(filterBarIsExpanded)}>
        {filterBarIsExpanded ? (
          <div className={filterIcon}>
            <i className="material-icons">filter_list</i>
          </div>
        ) : (
          <div className={filterIcon}>
            <i className="material-icons">sort</i>
          </div>
        )}
        {activeFilter === "all" ? "filter" : filterDisplay[`${activeFilter}`]}
      </div>
      <div className={filterBar}>
        <div onClick={() => changeFilter("all")} className={filterAll}>
          all
        </div>
        <div onClick={() => changeFilter("original")} className={filterOriginals}>
          originals
        </div>
        <div onClick={() => changeFilter("limitedRun")} className={filterLimitedRun}>
          limited run
        </div>
        <div onClick={() => changeFilter("poster")} className={filterPosters}>
          posters
        </div>
        <div onClick={() => changeFilter("discount")} className={filterDiscounts}>
          discounts
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
