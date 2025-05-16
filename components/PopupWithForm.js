import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupselector, handleFormSubmit }) {
    super({ popupselector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputlist = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this.inputlist.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}
export default PopupWithForm;
