import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../models';
import SaveVersionDialog, { ISaveVersionDialogProps } from '../components/SaveVersionDialog';
import { saveVersion } from '../actions';

export interface IVersionSaverProps {
    isOpen: boolean,
    onClose: () => void
}

const mapStateToProps = (state: RootState, props: IVersionSaverProps): Partial<ISaveVersionDialogProps> => ({
    isOpen: props.isOpen,
    onClose: props.onClose,
    error: state.error,
    isSaving: state.isSaving
});

const mapDispatchToProps = (dispatch): Partial<ISaveVersionDialogProps> => ({
    onSave: comment => dispatch(saveVersion(comment))
});

const VersionSaver = connect(mapStateToProps, mapDispatchToProps)(SaveVersionDialog);

export default VersionSaver;