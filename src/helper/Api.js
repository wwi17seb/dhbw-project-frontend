import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getTokenFromStorage } from './tokenHelper';

export const APICall = async (method, url, data) => {
  const token = getTokenFromStorage();
  const params = token ? { token } : {};
  return axios
    .request({
      data,
      method,
      url: `/api/${url}`,
      params,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

function ApiHandler(props) {
  //THIS COMPONENT TAKES PROPS:
  //          params                  object of parameters for api request (excluding token)
  //          url                     the url of the api service route
  //          handleAPIresponse       function of the parent component to receive the data

  const [open, setOpen] = useState(false);
  const [errorMsg, setError] = useState('');
  const [initial, setInitial] = useState(true);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.replace({
      pathname: '/', //state: { message: "Successfully logged out!" }
    });
  };

  useEffect(() => {
    if (initial) {
      const fetch = async () => {
        let params = {
          token: localStorage.getItem('ExoplanSessionToken'),
        };
        if (typeof props.params !== 'undefined') {
          for (let [key, value] of Object.entries(props.params)) {
            params[key] = value;
          }
        }
        await axios
          .get(props.url, { params })
          .then((response) => {
            props.handleAPIresponse(response);
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response);

            if (typeof err.response !== 'undefined') {
              setError(err.response.status);

              switch (err.response.status) {
                case 400:
                  //specific error handling
                  break;
                case 500:
                  //specific error handling
                  break;
                default:
                  break;
              }
            } else {
              setError(err);
            }
            setOpen(true);
          });
      };
      fetch();
      setInitial(false);
    }
  });

  return open ? handleClose() : null;
}

export default ApiHandler;
