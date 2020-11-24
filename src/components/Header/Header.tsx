import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm, { ITodoFormProps } from '../NewTaskForm';

import './Header.scss';

const Header: React.FC<ITodoFormProps> = ({ onAdd }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
};

Header.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Header;
