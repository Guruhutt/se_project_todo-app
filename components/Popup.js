class Popup {
  constructor({ popupselector }) {
    this._popupElement = document.querySelector(popupselector);
    this._popupButtonSelector =
      this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  _handleEscapeClose() {}

  setEventListeners() {
    this._popupButtonSelector.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
