import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupselector, handleFormSubmit }) {
    super({ popupselector: popupselector });
  }
}
export default PopupWithForm;
