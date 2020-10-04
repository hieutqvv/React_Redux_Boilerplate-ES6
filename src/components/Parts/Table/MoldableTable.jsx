import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import rowNumberCell from '../../../lib/table/cellTemplates/rowNumberCell';

class MoldableTableComponent extends Component {
  static propTypes = {
    onFetchData: PropTypes.func,
    minRows: PropTypes.number,
    hasSubComponent: PropTypes.bool,
    table: PropTypes.object,
    data: PropTypes.array,
    showPagination: PropTypes.bool
  };

  static defaultProps = {
    columnVisibility: {},
    pageSize: 100,
    sorted: [{id: 'visitedAt', desc: true}],
    minRows: 5,
    showPagination: true,
    config: {
      columns: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pages: -1,
      items: [],
      columns: [],
      isLoading: false,
      pageSizeOptions: [50, 100, 200],
    };
    this.self = React.createRef();
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.onSortedChange = this.onSortedChange.bind(this);
    this.displayableColumns = this.displayableColumns.bind(this);
    this.generateColumnProperty = this.generateColumnProperty.bind(this);
    this.availableColumns = {
      rowNumber: rowNumberCell
    };
  }

  /**
   * Method to hook to an event that changes the number of pages around one page.
   *
   * @param {Number} pageSize
   * @param {Number} page
   */
  onPageSizeChange(pageSize, page) {
    let newConfig = Object.assign(this.props.config, {pageSize});
    this.props.updateConfig(newConfig);
  }

  onSortedChange(sorted, instance) {
    let newConfig = Object.assign(this.props.config, {sorted});
    this.props.updateConfig({name: 'configOf' + this.props.pageName, config: newConfig});
  }

  /**
   * Generate property of column for ReactTable.
   *
   * @param {string} accessor
   * @returns {{Header: string | *, accessor: *}}
   */
  generateColumnProperty(accessor) {
    const cellType = this.props.columns[accessor].cellType || 'default';
    let columnProperty = {
      accessor,
      Header: this.props.intl.formatMessage({id: this.props.columns[accessor].label}),
      show: true,
    };
    if (typeof this.availableColumns[cellType] === 'function') {
      columnProperty = Object.assign(columnProperty, this.availableColumns[cellType](this.props, accessor));
    }

    return columnProperty;
  }

  displayableColumns() {
    let columns = [];
    for (let accessor in this.props.columns) {
      if (!this.props.columns.hasOwnProperty(accessor)) {
        continue;
      }
      let column = this.props.columns[accessor];
      if (column.isForce !== undefined && column.isForce !== true) {
        continue;
      }
      if (this.props.config.columns[accessor] !== undefined) {
        let columnConfig = this.props.config.columns[accessor];
        if (columnConfig.show === undefined || columnConfig.show !== true) {
          continue;
        }
      }
      columns.push(this.generateColumnProperty(accessor));
    }
    return columns;
  }

  render() {
    return (
      <ReactTable
        manual
        ref={this.props.table}
        className="-striped -highlight"
        filterable={false}
        data={this.props.data}
        columns={this.displayableColumns()}
        pages={this.props.pages}
        defaultPageSize={this.props.config.pageSize}
        defaultSorted={this.props.config.sorted}
        pageSizeOptions={this.state.pageSizeOptions}
        loading={this.state.isLoading}
        onFetchData={typeof this.props.onFetchData === 'function' ? this.props.onFetchData : undefined}
        previousText={this.props.intl.formatMessage({id: 'Previous page'})}
        nextText={this.props.intl.formatMessage({id: 'Next page'})}
        loadingText={this.props.intl.formatMessage({id: 'Loading...'})}
        noDataText={this.props.intl.formatMessage({id: 'No rows found'})}
        pageText={this.props.intl.formatMessage({id: 'Page'})}
        ofText={this.props.intl.formatMessage({id: 'of'})}
        rowsText={this.props.intl.formatMessage({id: 'rows'})}
        minRows={this.props.minRows}
        showPagination={this.props.showPagination}
      />
    );
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {};
};

const MoldableTable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MoldableTableComponent));
export default MoldableTable;
