import React, { useState, useRef } from "react";
import "../styles/main.css";
import { useClickOutside } from "../hooks/useClickOutside";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addUserToArchive,
  addUserToActive,
  hideUser,
} from "../store/reducers/usersSlise";

const DropdownList = ({ userId, dropdownStrings }) => {
  const dispatch = useDispatch();

  const handleAddToArchive = (userId) => {
    dispatch(addUserToArchive(userId));
  };
  const handleAddToActive = (userId) => {
    dispatch(addUserToActive(userId));
  };
  const handleAddToHide = (userId) => {
    dispatch(hideUser(userId));
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownListRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useClickOutside(dropdownListRef, () => {
    if (isOpen) setIsOpen(false);
  });
  return (
    <div ref={dropdownListRef} className="dropdown">
      <button
        className={`main-card__btn ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
      ></button>
      {isOpen && (
        <nav className="dropdown-wrapper">
          {dropdownStrings.length > 1 ? (
            <ul className="dropdown__list">
              <li className="dropdown__item">
                <Link to="/edit" state={{ userId: userId }}>
                  {dropdownStrings[0]}
                </Link>
              </li>
              <li
                className="dropdown__item"
                onClick={() => handleAddToArchive(userId)}
              >
                {dropdownStrings[1]}
              </li>
              <li
                className="dropdown__item"
                onClick={() => handleAddToHide(userId)}
              >
                {dropdownStrings[2]}
              </li>
            </ul>
          ) : (
            <ul className="dropdown__list">
              <li
                className="dropdown__item"
                onClick={() => handleAddToActive(userId)}
              >
                {dropdownStrings[0]}
              </li>
            </ul>
          )}
        </nav>
      )}
    </div>
  );
};

export default DropdownList;
