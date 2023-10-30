import React from "react";
import { Link } from "react-router-dom";
import iconFirst from "../img/iconFirst.svg";
import iconSecond from "../img/iconSecond.svg";
import favorite from "../img/favorite.svg";
import notification from "../img/notification.svg";
import menuAvatar from "../img/menuAvatar.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/">
          <div className="logo">
            <div className="icon">
              <img className="icon__up" src={iconFirst} alt="" />
              <img className="icon__down" src={iconSecond} alt="" />
            </div>
            <div className="logo__name">
              at-<span>work</span>
            </div>
          </div>
        </Link>
        <div className="header-menu">
          <div className="header-menu__tools tools">
            <button className="tools__btn">
              <img src={favorite} alt="" />
            </button>
            <button className="tools__btn">
              <img src={notification} alt="" />
            </button>
          </div>
          <button className="header-menu__profile">
            <img src={menuAvatar} alt="" />
            <span>Ivan1234</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
