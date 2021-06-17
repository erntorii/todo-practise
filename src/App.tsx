import { useState, useEffect } from 'react';
import { FormControl, TextField, List } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/styles';

import { db, auth } from './firebase';
import TaskItem from './TaskItem';
import './App.css';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '40%',
  },
});

type Props = {
  history: any;
};

const App = ({ history }: Props) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push('login');
    });
    return () => unSub();
  });

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input });
    setInput('');
  }

  return (
    <div className="app">
      <h1>Todo App by React/Firebase</h1>
      <button
        className="app__logout"
        onClick={async () => {
          try {
            await auth.signOut();
            history.push('login');
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{ shrink: true }}
          label="New task ?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>
      <button className="app__icon" disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
