import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.scss';

interface ITaskFilterProps {
  onChangeFilter(filterValue: string): void;
}

const TaskFilter: React.FC<ITaskFilterProps> = ({ onChangeFilter }) => {
  const [currentFilter, setCurrentFilter] = useState<string>('All');

  const changeFilterHandler = (event: React.SyntheticEvent) => {
    setCurrentFilter(event.target.innerText);
    onChangeFilter(event.target.innerText);
  };

  const filterItems = ['All', 'Active', 'Completed'].map((elem) => {
    return (
      <li key={elem}>
        <button type="button" className={elem === currentFilter ? 'selected' : ''} onClick={changeFilterHandler}>
          {elem}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterItems}</ul>;
};

TaskFilter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
