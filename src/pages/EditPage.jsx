import React, { useState, useEffect } from "react";
import "../styles/edit-page.css";
import { Link, useLocation } from "react-router-dom";
import userPhoto from "../img/userPhoto.jpg";
import clearButton from "../img/icons/clear.svg";
import close from "../img/icons/close.svg";
import success from "../img/icons/success.svg";
import Category from "../components/Category";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUserById } from "../store/reducers/usersSlise";

const EditPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userId } = location.state;
  const { user, status, error } = useSelector(
    (state) => state.users.getEditingUser
  );

  const [firstName, setFirstName] = useState("");
  const [nickName, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState(null);
  const [formError, setFormError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    let timeoutId;
    if (showSuccessMessage) {
      timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showSuccessMessage]);

  const handleFocus = (e) => {
    setFocus(e.target.name);
  };

  const clearInput = (inputField) => {
    switch (inputField) {
      case "first-name":
        setFirstName("");
        break;
      case "nickname":
        setNickname("");
        break;
      case "email":
        setEmail("");
        break;
      case "city":
        setCity("");
        break;
      case "phone":
        setPhone("");
        break;
      case "company":
        setCompany("");
        break;
      default:
        break;
    }
    setFocus(null);
  };

  const validateForm = () => {
    if (
      firstName.trim() === "" ||
      nickName.trim() === "" ||
      email.trim() === "" ||
      city.trim() === "" ||
      phone.trim() === "" ||
      company.trim() === ""
    ) {
      setFormError(true);
      return false;
    }
    setFormError(false);
    return true;
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    const formattedValue = phoneValue.replace(/[^\d]/g, "");
    setPhone(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      dispatch(
        updateUserById({
          userId,
          firstName,
          nickName,
          email,
          city,
          phone,
          company,
        })
      )
        .then(() => {
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="edit-page">
      {showSuccessMessage && (
        <div className="overlay">
          <div className="success-message">
            <img
              onClick={() => setShowSuccessMessage(false)}
              src={close}
              alt=""
            />
            <div className="success-message__img">
              <img src={success} alt="" />
            </div>
            <p>Изменения сохранены!</p>
          </div>
        </div>
      )}
      <div className="edit-page__container container">
        <Link to="/" className="edit-page__return">
          Назад
        </Link>
        <div className="edit-page__main edit-main">
          <div className="edit-main__profile profile-information">
            <div className="profile-information__photo">
              <img src={userPhoto} alt="" />
            </div>
            <div className="profile-information__data data-about">
              <Category />
            </div>
          </div>
          <div className="edit-main__profile profile-data">
            <div className="main-title">Данные профиля</div>
            {status === "loading" ? (
              <h3 className="loading">Загрузка данных...</h3>
            ) : status === "rejected" ? (
              <h3 className="error">Произошла ошибка: {error}</h3>
            ) : (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="edit-form__item">
                  <label htmlFor="first-name">Имя</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder={user?.name}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "first-name" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("first-name")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <div className="edit-form__item">
                  <label htmlFor="nickname">Никнейм</label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder={user?.username}
                    value={nickName}
                    onChange={(e) => setNickname(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "nickname" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("nickname")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <div className="edit-form__item">
                  <label htmlFor="email">Почта</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={user?.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "email" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("email")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <div className="edit-form__item">
                  <label htmlFor="city">Город</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder={user?.address.city}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "city" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("city")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <div className="edit-form__item">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={user?.phone}
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "phone" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("phone")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <div className="form-item_last edit-form__item">
                  <label htmlFor="company">Название компании</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder={user?.company.name}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {focus === "company" && (
                    <div
                      className="clear-button"
                      onClick={() => clearInput("company")}
                    >
                      <img src={clearButton} alt="" />
                    </div>
                  )}
                </div>
                <button type="submit">Сохранить</button>
                {formError && (
                  <div className="form-error" style={{ color: "red" }}>
                    Поля не должны быть пустыми!
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditPage;
