import React, { useEffect } from "react";
import MenuBar from "./kitty/menubar";
import Context from "./context";

// Сам реакт мне показался сложнее, чем Vue в плане синтаксиса
// Где-то передавал компоненты насквозь, где-то по цепочке
// Здесь использовал MUI версии 5.3.1
// MUI не понравился, слишком много импортировать, а сама библиотека скудная
// В основном здесь всё через функциональные компоненты, кроме editcat.js

// Подробная информация о котике оказалась не слишком нужна, в карточке есть всё.
// Запрос на добавление фото отдельный и я так понимаю не рабочий, в противном случае бы
// добавил на компонент редактирования фотку, при нажатии на которую открывался input file

// Не удаляйте котиков! Их и так мало
// Создание котика не работает, редактирование котика работает не  правильно
// Не хватает запроса для получения видов раскраски, либо в ТЗ не должно было быть условия выпадающего списка (вбивал бы цвет от руки)
// Старался выбирать компоненты MUI, которые будут адаптированны под мобильные устройства
// При желании часть кода можно отрефакторить с помощью циклов, однако здесь не так много повторений, поэтому выбрал читабельность

function App() {
  const [infocat, SetInfocat] = React.useState("");
  const [list, SetList] = React.useState([]);
  const [breeds, SetBreeds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [booked, setBooked] = React.useState(false);
  const [newcatstate, setNewcatstate] = React.useState("none");

  useEffect(() => {
    GetCatList();
    GetCatBreeds();
  }, []);
  //
  async function bookedToggle(value) {
    setBooked(value);
    await GetCatList(value);
  }
  // Получить список  котиков
  async function GetCatList(value) {
    setLoading(true); // лоадер
    let response = await fetch(
      !value
        ? "https://internship.apps.robotbull.com/cats/get/not_booked_cats"
        : "https://internship.apps.robotbull.com/cats/get/booked_cats",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    let result = await response.json();
    // мне не нравилась ошибка 404
    if (Array.isArray(result)) {
      // Я решил добавить всем котикам изображение и ИСКУССТВЕННО добавить задержку, чтобы показать лоадер
      setTimeout(() => {
        SetList(
          result.map((cat) => {
            cat.image = "1489052030_kotik-hosiko-12.jpg";
            return cat;
          })
        );
        setLoading(false);
      }, 1000);
    } else {
      SetList([]);
      setLoading(false);
    }
  }
  // Получить список пород
  async function GetCatBreeds() {
    let response = await fetch(
      "https://internship.apps.robotbull.com/cats/get/get_all_breeds",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    let result = await response.json();
    result.map((breed) => {
      delete breed["cats"];
      // delete breed["createdAt"];
      return breed;
    });
    SetBreeds(result);
  }
  // Добавить/редактировать котика
  function addCat(form) {
    // запрос на добавление не работает
    if (newcatstate == "create") {
      // Иллюзия запроса на клиенте
      SetList(
        list.concat([
          {
            id: Math.random(),
            nameCat: form.nameCat,
            breed: form.breed,
            color: form.color,
            price: form.price,
            age: form.age,
            image: "1489052030_kotik-hosiko-12.jpg",
            isBooked: false,
            createdAt: "2021-10-03 19:35:44.458634",
          },
        ])
      );

      // запрос на редактирование работает неккоректно
    } else if (newcatstate == "edit") {
      let body = {
        name: form.nameCat,
        price: form.price,
        color: form.color,
        nameBreed: form.breed.nameBreed,
      };
      fetch(
        "https://internship.apps.robotbull.com/cats/update_cat/" + form.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(body),
        }
      );
      // обновление данных
      bookedToggle(booked);
    }
    toggleCreate("none");
  }
  // Редактировать котика
  function editCat(form) {
    toggleCreate("edit");
    setTimeout(() => {
      SetInfocat(form);
    }, 0);
  }

  // Забронировать/Разбронировать
  // При нажатии я не стал убирать котика сразу из списка, вдруг пользователь решит передумать
  function booking(id) {
    SetList(
      list.map((cat) => {
        if (cat.id == id) {
          querybooking(id, cat.isBooked);
          cat.isBooked = !cat.isBooked;
        }
        return cat;
      })
    );
  }
  // Запрос на бронирование, разбронирование
  function querybooking(id, value) {
    fetch(
      value
        ? "https://internship.apps.robotbull.com/cats/unbook_cat/" + id
        : "https://internship.apps.robotbull.com/cats/book_cat/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
  }

  // Удаление котика
  function removeCats(id) {
    SetList(list.filter((cat) => cat.id !== id));
  }

  // Переключатель добавления и редактирования
  async function toggleCreate(state) {
    setNewcatstate(state);
    if (state == "none") {
      SetInfocat("");
    }
  }
  return (
    <Context.Provider value={{ removeCats, GetCatList, editCat }}>
      <div className="maincat">
        <MenuBar
          className="menubar"
          catlist={list}
          infocat={infocat}
          loading={loading}
          booked={booked}
          breeds={breeds}
          newcatstate={newcatstate}
          bookedToggle={bookedToggle}
          booking={booking}
          addCat={addCat}
          toggleCreate={toggleCreate}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
