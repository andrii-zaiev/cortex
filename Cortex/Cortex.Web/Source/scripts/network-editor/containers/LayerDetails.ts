import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../models';
import {  } from '../actions/index';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = dispatch => ({});

const LayerDetails = connect(mapStateToProps, mapDispatchToProps)(LayerDetailsPanel);

export default LayerDetails;