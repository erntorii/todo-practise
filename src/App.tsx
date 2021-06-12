import { useState, useEffect } from 'react';
import { FormControl, TextField, List } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import { db } from './firebase';
import TaskItem from './TaskItem';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');
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
    <div className="App">
      <h1>Todo App by React/Firebase</h1>
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="New task ?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
