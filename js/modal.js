(() => {
  const refs = {
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    body: document.querySelector("body"),
    orderForm: document.querySelector(".modal-form"),
    modalContent: document.querySelector(".modal-content"),
    successContent: document.querySelector(".modal-success"),
    bagCount: document.querySelector(".bag-count"),
    checkboxes: document.querySelectorAll(".selection-check-input"),
  };

  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });
  });

  refs.closeModalBtn.addEventListener("click", toggleModal);

  refs.modal.addEventListener("click", (e) => {
    if (e.target === refs.modal) toggleModal();
  });

  function toggleModal() {
    const isHidden = refs.modal.classList.toggle("is-hidden");
    refs.body.classList.toggle("no-scroll");

    if (!isHidden) {
      window.addEventListener("keydown", onEscKeyPress);
    } else {
      window.removeEventListener("keydown", onEscKeyPress);
      resetModalContent();
    }
  }

  function onEscKeyPress(e) {
    if (e.code === "Escape") toggleModal();
  }

  function resetModalContent() {
    setTimeout(() => {
      refs.modalContent.classList.remove("is-hidden");
      refs.successContent.classList.add("is-hidden");
      refs.orderForm.reset();
      updateCartCount();
    }, 250);
  }

  refs.orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Скрываем форму и показываем малину
    refs.modalContent.classList.add("is-hidden");
    refs.successContent.classList.remove("is-hidden");

    // 2. ПРИНУДИТЕЛЬНО снимаем галочки со всех чекбоксов
    refs.checkboxes.forEach((cb) => {
      cb.checked = false; // Снимаем галочку программно
    });

    // 3. Очищаем текстовые поля формы
    refs.orderForm.reset();

    // 4. Обновляем счётчик в хедере (он увидит, что стало 0 и исчезнет)
    updateCartCount();
  });

  function updateCartCount() {
    const selectedCount = Array.from(refs.checkboxes).filter(
      (cb) => cb.checked,
    ).length;

    if (refs.bagCount) {
      refs.bagCount.textContent = selectedCount;

      if (selectedCount > 0) {
        refs.bagCount.classList.remove("is-empty");
        refs.bagCount.classList.add("bump");
        setTimeout(() => refs.bagCount.classList.remove("bump"), 300);
      } else {
        refs.bagCount.classList.add("is-empty");
      }
    }
  }

  refs.checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateCartCount);
  });

  updateCartCount();
})();
