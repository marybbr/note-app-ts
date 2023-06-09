import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";

type ErrorHandlerProps = {
  isShow: boolean;
};

export function ErrorHandlre({ isShow }: ErrorHandlerProps) {
  const [showToast, setShowToast] = useState(isShow);

  useEffect(() => {
    setShowToast(true);
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [isShow]);

  if (!showToast) {
    return null;
  }

  return (
    <Toast show={showToast} className="toast-danger">
      <Toast.Body>Data Not Found</Toast.Body>
    </Toast>
  );
}
