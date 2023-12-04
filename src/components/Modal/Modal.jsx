import { Close } from "../../icons/Icons";
import Button from "../Button/Button";
import "./Modal.css";

export default function Modal({ state = false, setState, title, children }) {
  function handleClose() {
    setState(false);
  }

  function handleCloseModal(ev) {
    if (ev.target.className == "contModal") {
      setState(false);
    }
  }

  return (
    state && (
      <div className="contModal" onClick={handleCloseModal}>
        <div className="modal">
          <header>
            <h3>{title}</h3>
            <Button
              onliIcon={true}
              initialIcon={<Close onClick={handleClose} />}
            />
          </header>
          {children}
        </div>
      </div>
    )
  );
}
