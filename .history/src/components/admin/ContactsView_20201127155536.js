import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Api from '../../Api'
import { getToken } from '../../services/Auth'
import SearchBar from '../../services/common/SearchBar';

function ContactsView() {

  const [contacts, setContacts] = useState([])
  const history = useHistory();

  useEffect(() => {
    Api.get('/contacts', {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
    .then((response) => {
      // console.log(response)
      setContacts(response.data)
    })
    .catch((errors) => {
      console.log(errors)
    })
    .finally(() => {})
  }, [])

  const handleClickRes = (id) => {
    history.push(`/admin/contacts/response/${id}`)
  }

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <h1>List Contacts</h1>
        <SearchBar
          path="/admin/contacts/search"
          handle={(data) => {
            setContacts(data);
          }}
        />
        <br/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Mensagem</th>
              <th>Status</th>
              <th colSpan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => 
              <tr key={index}>
              <td>{contact.idContact}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{contact.status}</td>
              <td>
                <button
                  onClick={ () => handleClickRes(contact.idContact) }
                  className="btn btn-primary">
                  Responder
                </button>
              </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="col-md-1"></div>
    </div>
  )
}

export default ContactsView