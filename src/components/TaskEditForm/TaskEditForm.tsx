import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskEditForm.scss';

interface ITodoEditFormProps {
  task: string;
  id: string;
  onEditTask(id: string, task: string): void;
}

const TaskEditForm: React.FC<ITodoEditFormProps> = ({ task, id, onEditTask }) => {
  const [text, setText] = useState<string>(task);

  const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const submitFormHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!text) return;
    onEditTask(id, text);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <input type="text" className="edit" value={text} onChange={changeTextHandler} />
    </form>
  );
};

TaskEditForm.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskEditForm;
