/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TaskEditForm from '../TaskEditForm';
import Timer from '../Timer';

import './Task.scss';

interface ITodoTaskProps {
  task: string;
  id: string;
  createdDate: number;
  completed: boolean;
  editing: boolean;
  time: number;
  onDelete(id: string): void;
  onCompleteToggle(id: string): void;
  onEditingToggle(id: string): void;
  onEditTask(id: string, task: string): void;
  onPlayTimer(id: string): void;
  onPauseTimer(id: string): void;
}

const Task: React.FC<ITodoTaskProps> = ({
  task,
  id,
  createdDate,
  completed,
  editing,
  time,
  onDelete,
  onCompleteToggle,
  onEditingToggle,
  onEditTask,
  onPlayTimer,
  onPauseTimer,
}) => {
  const createDistanceTime = formatDistanceToNow(createdDate);

  const completeToggleHandler = () => {
    onCompleteToggle(id);
  };

  const timer = time ? <Timer time={time} id={id} onPlayTimer={onPlayTimer} onPauseTimer={onPauseTimer} /> : null;

  let taskStyleClassName = 'active';

  if (completed) taskStyleClassName = 'completed';
  if (editing) taskStyleClassName = 'editing';

  return (
    <li className={taskStyleClassName}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={completeToggleHandler} />
        <label onClick={completeToggleHandler}>
          <span className="description">{task}</span>
          <span className="created">{createDistanceTime}</span>
        </label>
        <button type="button" className="icon icon-edit" label="edit" onClick={() => onEditingToggle(id)} />
        <button type="button" className="icon icon-destroy" label="delete" onClick={() => onDelete(id)} />
        {timer}
      </div>
      {editing ? <TaskEditForm task={task} id={id} onEditTask={onEditTask} /> : null}
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  createdDate: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleteToggle: PropTypes.func.isRequired,
  onEditingToggle: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onPlayTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};

export default Task;
