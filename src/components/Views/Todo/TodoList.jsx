import React, { Component } from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import OperableCard from '../../Parts/Card/OperableCard'
import MoldableTable from '../../Parts/Table/MoldableTable';
import LoadableTable from '../../Parts/Table/LoadableTable'
import todoListColumns from '../../../lib/table/columnTemplates/todoList';

export class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayable: false,
    };
    this.title = 'Todo List';
    this.endpoint = '/todos';
    this.pageName = 'Todo';
    this.table = React.createRef();
    this.columns = todoListColumns;
  }
  render() {
    return (
      <OperableCard
        title={this.title}
        onReload={this.table.current && this.table.current.fireFetchData}
        pageName={this.pageName}
        displayable={this.state.displayable}
        configurable={true}
        config={this.props.config}
        columns={this.columns}
      >
        <LoadableTable
          pageName={this.pageName}
          endpoint={this.endpoint}
          query={{}}
          columns={this.columns}
          onLoaded={() => this.setState({displayable: true})}
          table={this.table}
          config={this.props.config}
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
