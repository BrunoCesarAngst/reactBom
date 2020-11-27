import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Api from '../../Api.js'
import { useHistory } from "react-router-dom";


function Contacts() {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);

    Api.post('/contacts', {
      name: data.name,
      email: data.email,
      message: data.message,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (errors) {
        console.log(errors);
      })
      .finally(function () {
        history.push('/contacts/view');
      });
  };

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              ref={register({
                required: "Required",
              })}
              name="name"
              className="form-control"
              type="text"
              id="nome"
            />
            <ErrorMessage errors={errors} name="none" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              ref={register({
                required: "Required",
              })}
              name="email"
              className="form-control"
              type="email"
              id="email"
            />
            <ErrorMessage errors={errors} name="none" />
          </div>
          <div className="form-group">
            <label htmlFor="msg">Mensagem:</label>
            <textarea
              ref={register({
                required: "Required",
              })}
              name="mensagem"
              className="form-control"
              type="message"
              id="msg"
            ></textarea>
            <ErrorMessage errors={errors} name="none" />
          </div>
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
          <br />
          <br />
        </form>
      </div>
      <div className="col-md-1"></div>
    </div>
  );
}

export default Contacts;
