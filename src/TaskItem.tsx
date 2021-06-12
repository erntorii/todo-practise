import { useState } from 'react';
import firebase from 'firebase/app';
import { db } from './firebase';
import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

type Props = {
  id: string;
  title: string;
};

const TaskItem = ({ id, title }: Props) => {
  const [taskTitle, setTaskTitle] = useState(title);

  const editTask = () => {
    db.collection('tasks').doc(id).set({ title: taskTitle }, { merge: true });
  };

  const deleteTask = () => {
    db.collection('tasks').doc(id).delete();
  };

  return (
    <ListItem>
      <h2>{title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Edit task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </Grid>
      <button onClick={editTask}>
        <EditOutlinedIcon />
      </button>
      <button onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  )
}

export default TaskItem
