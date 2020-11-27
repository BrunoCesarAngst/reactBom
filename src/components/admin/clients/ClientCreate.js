import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import Api from '../../../Api';
import { getToken } from '../../../services/Auth';
import { useForm } from 'react-hook-form'

function ClientCreate() {
  
  const { handleSubmit, register, errors } = useForm();

  const history = useHistory();

  const onSubmit = (data) => {
    Api.post('/clients', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
    }, {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
    .catch(function (errors) {
      console.log(errors);
    })
    .finally(
      () => {
        history.push('/admin/clients/view')
        window.location.reload(true)
      }
    )
  }

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
      <h2>Retorno ao Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            ref={register({
              required:"required",
            })}
            className="form-control"
            type="text"
            name="name"
            id="name"
          />
          <ErrorMessage errors={errors} name="name" />
        </div>
      
        <div className="form-group">
          <label htmlFor="phone">Fone</label>
          <input
            ref={register({
              required:"required",
            })}
            className="form-control"
            type="text"
            name="phone"
            id="phone"
          />
          <ErrorMessage errors={errors} name="phone" />
        </div>
      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={register({
              required:"required",
            })}
            className="form-control"
            type="text"
            name="email"
            id="email"
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
      
        <div className="form-group">
          <label htmlFor="address">Endereço</label>
          <input
            ref={register({
              required:"required",
            })}
            className="form-control"
            type="text"
            name="address"
            id="address"
          />
          <ErrorMessage errors={errors} name="address" />
        </div>              
        <div className="form-group text-right">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
      </div>
      <div className="col-md-1"></div>
    </div>
  )
}

export default ClientCreate;