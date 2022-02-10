/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core/";
import api from "../services/api";

const Contatos = () => {
  const [message, setMessage] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("message").then((response) => {
      setMessage(response.data);
    });
  }, [render]);

  const sendMessage = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };
    console.log(bodyForm);
    api
      .post("message", {
        body: JSON.stringify(bodyForm),
      })
      .then((response) => {
        setMessage(response.data);
        setAuthor("");
        setContent("");
        setSuccess(true);
      });

    setRender(!render);
  };

  return (
    <>
      <Grid container direction="row" xs={12}>
        <TextField
          id="name"
          label="Nome"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
          fullWidth
        />
        <TextField
          id="message"
          label="Mensagem"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          fullWidth
        />
      </Grid>

      {validator && (
        <div
          className="alert alert-warning alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Por favor preencha todos os campos!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {success && (
        <div
          className="alert alert-success alert-dismissible fade show mt-2"
          role="alert"
        >
          <strong>Mensagem foi enviada</strong>
        </div>
      )}

      <Button
        onClick={sendMessage}
        className="mt-2"
        variant="contained"
        color="primary"
      >
        Enviar
      </Button>

      {message.map((content) => {
        return (
          <div className="card mt-2" key={content.id}>
            <div className="card-body">
              <h5 className="card-title">{content.email}</h5>
              <p className="card-text">{content.message}</p>
              <p className="card-text">
                <small className="text-muted">{content.created_at}</small>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Contatos;
