import React, { useCallback, useEffect } from "react";
import Toast from "react-native-root-toast";
import { API_CONNECTION_ERROR } from "../constants/Strings";

interface ApiConnectionErrorToastProps {
  visible: boolean;
}

const ApiConnectionErrorToast = ({ visible }: ApiConnectionErrorToastProps) => {
  return (
    <Toast
      visible={visible}
      position={100}
      shadow={false}
      animation={false}
      hideOnPress={true}
    >
      {API_CONNECTION_ERROR}
    </Toast>
  );
};

export default ApiConnectionErrorToast;
