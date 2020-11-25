import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import css from './style.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function PlaintextEditor({ file, write }) {
  //console.log(file, write);

  const classes = useStyles();
  const [text, setText] = useState('');

  useEffect(() => {
   (async () => {
      setText(await file.text())
    })()
  }, [file])

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const saveFile = (event) => {
    event.preventDefault()
    const newFile = new File(
      [text],
      file.name,
      {
        type : file.type,
        lastModified: new Date()
      }
    )

    write(newFile)
  }

  return (
    <div className={css.editor}>
      <TextField
        value = {text}
        onChange = {handleChange}
        multiline
      />
      <Button
        onClick = {saveFile}
        variant = 'contained'
        color = 'primary'
        size = 'small'
        className = {classes.button}
        >
           Save
      </Button>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
