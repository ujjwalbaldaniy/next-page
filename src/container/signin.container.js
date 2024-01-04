import useUseRoute from "@/hooks/useUseRoute";
import { api } from "@/utils/api";
import { LOGIN_API, POST } from "@/utils/apiPath";
import { setAuthToken, setAuthTokenRole } from "@/utils/auth";
import { ACCESS_TOKEN } from "@/utils/constant";
import { ManageErrorList, keys, length } from "@/utils/javascript";
import { setLocalStorageItem } from "@/utils/localStorage";
import validation from "@/utils/validation";
import { useState } from "react";

const SignInContainer = () => {
  const { handlePush } = useUseRoute();

  const [signInField, setSignInField] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInField({ ...signInField, [name]: value });
    const { isValid, message } = validation(name, value);
    setFormErrors({ ...formErrors, [name]: { isValid, message } });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const errors = ManageErrorList(signInField);

    if (length(keys(errors))) {
      setFormErrors(errors);
    } else {
      setLoader(true);
      const res = await api(POST, LOGIN_API, false, {
        email: signInField.email,
        password: signInField.password,
      });

      if (res?.status) {
        setLoader(false);
        const { data } = res;
        setLocalStorageItem(ACCESS_TOKEN, data);
        setAuthToken(data?.token);
        setAuthTokenRole(data?.role);
        handlePush("/client");
      } else {
        console.error("Login failed:", res?.data);
      }
    }
  };

  return {
    loader,
    signInField,
    formErrors,
    handleSignInChange,
    handleSignInSubmit,
  };
};

export default SignInContainer;
