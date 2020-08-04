import React, { Component } from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import OperableCard from '../../Parts/Card/OperableCard'
import MoldableTable from '../../Parts/Table/MoldableTable';
import todoListColumns from '../../../lib/table/columnTemplates/todoList';

export class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: true,
    };
    this.title = 'Todo List';
    this.endpoint = '/todos';
    this.pageName = 'Todo';
    this.table = React.createRef();
    this.data = [
      {
        title: 'Hieu'
      },
      {
        title: 'lalalala'
      },
      {
        title: 'balalal'
      }
    ];

  }
  render() {
    return (
      <OperableCard
        title={this.title}
        pageName={this.pageName}
        displayable={this.state.displayable}
        configurable={true}
      >
        <MoldableTable
          columns={todoListColumns}
          data={this.data}
          showPagination={false}
          onFetchData={this.onFetchData}
        />
      </OperableCard>
    )
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.config = storeState.configOfTodo;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {};
};

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(TodoListComponent));

export default TodoList;
