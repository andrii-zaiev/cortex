import { Connection, Layer, SelectedItem } from "./index";

export default interface RootState {
    networkId: string,
    versionId: string,
    isLoaded: boolean,
    isSaving: boolean,
    isEdit: boolean,
    isReadOnly: boolean,
    layers: Map<number, Layer>,
    connections: Map<number, Connection>,
    selectedItem: SelectedItem
}