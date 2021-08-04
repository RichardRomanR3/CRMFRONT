import React from 'react';
import { List, ListItem, Avatar, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MenuDerecha = ({ classes, usuario, salirSesion }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} to="/perfil">
        <Avatar src={usuario.imagenPerfil} />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={usuario ? usuario.nombrecompleto : ''}
        />
      </ListItem>
      <ListItem button onClick={salirSesion}>
        <i className="material-icons">power_settings_new</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Salir"
        />
      </ListItem>
    </List>
  </div>
);
