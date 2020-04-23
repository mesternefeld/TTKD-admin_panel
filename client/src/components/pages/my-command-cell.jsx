
import React from 'react';
import { TreeListCell } from '@progress/kendo-react-treelist';

export default function MyCommandCell(enterEdit, remove, save, editSave, cancel, addChild, editField, addVideoContent) {
    return class extends TreeListCell {
        render() {
            const { dataItem } = this.props;
            return dataItem[editField]
                ? (
                    <td>
                        <button
                            className="k-button"
                            onClick={() => save(dataItem)}>
                            {dataItem.isNew
                                ? 'Add'
                                : null}
                        </button>
                        <button
                            className="k-button"
                            onClick={() => cancel(dataItem)}>{dataItem.isNew
                                ? 'Discard'
                                : 'Cancel'}
                        </button>
                        <button
                            className="k-button"
                            onClick={() => editSave(dataItem)}>
                            {dataItem.isNew
                                ? 'Update'
                                : 'Update'}
                        </button>
                    </td>
                ) : (
                    <td>
                        <button
                            className="k-button"
                            onClick={() => addVideoContent()}>
                            Add Content
                        </button>
                        <button
                            className="k-button"
                            onClick={() => addChild(dataItem)}>
                            Add SubCategory
                        </button>
                        <button
                            className="k-button"
                            onClick={() => enterEdit(dataItem)}>
                            Edit
                        </button>
                        <button
                            className="k-button"
                            onClick={() => remove(dataItem)}>
                            Remove
                        </button>
                    </td>
                );
        }
    }
}

