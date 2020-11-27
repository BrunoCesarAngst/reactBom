import React from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../Api';
import { getToken } from '../Auth';

export default function SearchBar(props) {
  const {handleSubmit, register} = useForm();

  const handleSearch = data => {
    Api.get(`${props.path}/${data.search}`, {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
    .then(function (response) {
      props.handle(response.data);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="form-group">
          <label className="sr-only"></label>
          <input
            ref={register}
            type="text"
            name="search"
            className="form-control"
            placeholder="pesquise por..."
          />
        </div>
          <label className="sr-only"></label>
          <button
            type="submit"
            className="btn btn-success"
          >
            Pesquisar
          </button>
      </form>
    </div>
  )
}