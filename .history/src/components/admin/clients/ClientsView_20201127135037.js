import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Api from "../../../Api";
import { getToken } from "../../../services/Auth";
import SearchBar from "../../../services/common/SearchBar";
import ReactLoading from "react-loading";

function ClientsView() {
  const [clients, setClients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Api.get("/clients", {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((response) => {
        // console.log(response)
        setClients(response.data);
      })
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => {});
  }, []);

  const handleClickRes = (id) => {
    history.push(`/admin/clients/details/${id}`);
  };

  const handleClientCreate = () => {
    history.push("/admin/clients/create");
  };

  const handleDelete = (id) => {
    Api.post('/admin/clients/delete/${id}`, {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
    .then(function(response) {
      console.log(response.data)
      window.location.reload(true)
    }
  }

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <h1>Lista de Clients</h1>
        <br />
        {clients.length === 0 ? (
          <ReactLoading type="spin" color="black" className="loading" />
        ) : (
          <>
            <SearchBar
              path="/clients/search"
              handle={function (data) {
                setClients(data);
              }}
            />
            <br/>
            <div className="row">
              <button
                onClick={() => handleClientCreate()}
                className="btn btn-primary"
              >
                Novo Cliente
              </button>
            </div>
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Fone</th>
                  <th>Email</th>
                  <th>Endereço</th>
                  <th colSpan="2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.idClient}</td>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>{client.address}</td>
                    <td>
                      <button
                        onClick={() => handleClickRes(client.idClient)}
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                    </td>
                    {/* <td>
                    <button
                      onClick={ () => handleDelete(client.idClient) }
                      className="btn btn-danger">
                      Deletar
                    </button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="col-md-1"></div>
    </div>
  );
}

export default ClientsView;
