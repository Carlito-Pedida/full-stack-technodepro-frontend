import Toast from "react-bootstrap";
import ToastContainer from "react-bootstrap";

function Toaster(props) {
  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast>
        <Toast.Header>
          <i className="bi bi-check-circle-fill me-2"></i>
          <strong className="me-auto">Context Example App</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{props.children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Toaster;
