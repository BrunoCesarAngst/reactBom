import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Api from '../../../Api';
import { getToken } from '../../../services/Auth';
import { useForm } from 'react-hook-form'

function ClientDetails() {

  let {id} = useParams()
  const [client, setClient] = useState([]);
  const { handleSubmit, register } = useForm();

  const history = useHistory();

  useEffect (() => {
    Api.get(`/clients/${id}`, {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
      .then(
        (response) => {
          setClient(response.data)
        }
      )
  }, [id]);

  const onSubmit = (data) => {
    Api.post(`/clients/update/${client.idClient}`, {
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
    .then()
    .finally(
      () => {
        history.push('/admin/clients/view')
      }
    )
  }

  const handleChange = (event) => {
    setClient({...client, status: event.target.value})
  }

  return (
    <>
      <h2>Retorno ao Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-striped">
          <thead>
          
          </thead>

          <tbody>
            <tr>
              <th>ID</th>
              <td>{client.idClient}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>
                <div className="form-group">
                  <input
                    defaultValue={client.name}
                    onChange={handleChange}
                    ref={register}
                    type="text"
                    name="name"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>Fone</th>
              <td>
                <div className="form-group">
                  <input
                    defaultValue={client.phone}
                    onChange={handleChange}
                    ref={register}
                    type="text"
                    name="phone"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <div className="form-group">
                  <input
                    defaultValue={client.email}
                    onChange={handleChange}
                    ref={register}
                    type="text"
                    name="email"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td>
                <div className="form-group">
                  <input
                    defaultValue={client.address}
                    onChange={handleChange}
                    ref={register}
                    type="text"
                    name="address"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-group text-right">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </>
  )
}

export default ClientDetails;