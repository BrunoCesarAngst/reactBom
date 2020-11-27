import React from 'react';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import Api from '../../Api';
import { useHistory } from 'react-router-dom';
import { setToken } from '../../services/Auth';

function Login() {

  const { handleSubmit, register, errors } = useForm()
  const history = useHistory();

  const onSubmit = data => {

    Api.post('/users/login', {
      user: data.user,
      pass: data.pass,
    })
      .then(function (response) {
        if(response.data.acess === 'true') {
          setToken(response.data.token)
        }
      })
      .catch(function (errors) {
        console.log(errors);
      })
      .finally(function () {
        history.push('/admin/home');
        window.location.reload(true)
      });
  }

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="user">Usuário</label>
            <input
              ref={
                register({
                  required:"required",
                })
              }
              className="form-control"
              type="text"
              name="user"
              id="user"
            />

            <ErrorMessage errors={errors} name="user" />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Senha</label>
            <input
              ref={
                register({
                  required:"required",
                })
              }
              className="form-control"
              type="password"
              name="pass"
              id="pass"
            />
            <ErrorMessage errors={errors} name="pass" />
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
      <div className="col-md-1"></div>
    </div>
  )
}

export default Login