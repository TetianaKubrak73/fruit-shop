(() => {
  const refs = {
    // Кнопки открытия/закрытия
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),

    // Само окно и тело страницы
    modal: document.querySelector("[data-modal]"),
    body: document.querySelector("body"),

    // Контент внутри модалки
    orderForm: document.querySelector(".modal-form"), // Форма
    modalContent: document.querySelector(".modal-content"), // Блок с формой и карточками
    successContent: document.querySelector(".modal-success"), // Блок с малиной
  };

  // 1. Слушатель на открытие и закрытие по крестику
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  // 2. Слушатель на отправку формы
  refs.orderForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Чтобы страница не перезагрузилась
    showSuccess();
  });

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.body.classList.toggle("no-scroll");

    // Если мы закрываем окно, возвращаем форму на место для следующего раза
    if (refs.modal.classList.contains("is-hidden")) {
      setTimeout(() => {
        refs.modalContent.classList.remove("is-hidden");
        refs.successContent.classList.add("is-hidden");
        refs.orderForm.reset(); // Очистить поля формы
      }, 250); // Ждем окончания анимации закрытия
    }
  }

  function showSuccess() {
    // Скрываем форму и показываем малину
    refs.modalContent.classList.add("is-hidden");
    refs.successContent.classList.remove("is-hidden");
  }
})();
