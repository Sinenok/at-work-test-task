import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userPhoto from "../img/userPhoto.jpg";
import DropdownList from "../components/DropdownList";
import { fetchUsers } from "../store/reducers/usersSlise";

const MainPage = () => {
  const { listActive, status, error, listArchived } = useSelector(
    (state) => state.users.activeUsers
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="main">
      <div className="main__container container">
        {status === "loading" ? (
          <h2>Загрузка данных...</h2>
        ) : status === "rejected" ? (
          <h2>Произошла ошибка: {error}</h2>
        ) : (
          <>
            <div className="main__active main-category">
              <div className="main-title">Активные</div>
              <div className="main-category__cards active-cards">
                {listActive.map((user) => (
                  <div key={user.id} className="active-cards__item main-card">
                    <div className="main-card__wrapper">
                      <div className="main-card__photo">
                        <img src={userPhoto} alt="" />
                      </div>
                      <div className="main-card__content card-content">
                        <div className="card-content__title active-content-title">
                          {user.username}
                        </div>
                        <div className="card-content__info active-content-info">
                          {user.company.name}
                        </div>
                        <div className="card-content__footer active-content-footer">
                          {user.address.city}
                        </div>
                      </div>
                      <DropdownList
                        userId={user.id}
                        dropdownStrings={[
                          "Редактировать",
                          "Архивировать",
                          "Скрыть",
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {listArchived.length !== 0 && (
              <div className="main__archive main-category">
                <div className="main-title">Архив</div>
                <div className="main-category__cards archive-cards">
                  {listArchived.map((user) => (
                    <div
                      key={user.id}
                      className="archive-cards__item main-card"
                    >
                      <div className="main-card__wrapper">
                        <div className="main-card__photo archive-photo">
                          <img src={userPhoto} alt="" />
                        </div>
                        <div className="main-card__content card-content">
                          <div className="card-content__title archive-content-title">
                            {user.username}
                          </div>
                          <div className="card-content__info archive-content-info">
                            {user.company.name}
                          </div>
                          <div className="card-content__footer archive-content-footer">
                            {user.address.city}
                          </div>
                        </div>
                        <DropdownList
                          userId={user.id}
                          dropdownStrings={["Активировать"]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default MainPage;
