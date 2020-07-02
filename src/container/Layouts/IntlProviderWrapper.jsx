import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import i18n from '../../lib/i18n';

class IntlProviderWrapper extends Component {
  render() {
    const { locale } = this.props;
    return (
      <IntlProvider locale={locale} messages={i18n[locale]}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);
  newState.locale = storeState.locale;

  return newState;
}

export default connect(
  mapStateToProps,
  null
)(IntlProviderWrapper);
