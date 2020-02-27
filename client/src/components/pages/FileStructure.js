
import React from 'react';
import {
    TreeList, TreeListToolbar, mapTree, extendDataItem,
    removeItems, modifySubItems,
    TreeListTextEditor
} from '@progress/kendo-react-treelist';
import MyCommandCell from './my-command-cell.jsx';

const subItemsField = 'category';
const expandField = 'expanded';
const editField = 'inEdit';

class FileStructure extends React.Component {

    constructor(props){
        super(props);

    this.state = {
        data: [],
        expanded: [1],
        inEdit: [ ],
        categories: [],
        total: 1
    }

    this.addCategory = this.addCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
}

    // Fetch the list on first mount
    componentDidMount() {
        this.getCategories();
    }x

    // Retrieves the list of categories from the Express app
    getCategories = () => {
        console.log("Calling getCategories api endpoint ");
        fetch('/getFileStructureCategories')
        .then(res => res.json())
        .then(categories => this.setState({ data: categories.slice() },
        () => console.log(`[INFO][CLIENT][API: /getFileStructureCategories]:`, this.state.data)))
    }

    // Sends a category to the Express app to be added
    addCategory = (data) => {
        try {
        fetch('/addCategory',{
            method: 'POST',
            body: JSON.stringify({
                category: data,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'}
            })
            .then(res => console.log(`[INFO][CLIENT][API: /addCategory]:`, res))}
            catch (err) {
            console.log(err);
            }
      }

      // Sends a category to the Express app to be edited
     editCategory = (data) => {
        try {
        fetch('/editCategory',{
            method: 'POST',
            body: JSON.stringify({
                category: data,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'}
            })
            .then(res => console.log(`[INFO][CLIENT][API: /editCategory]:`, res))}
            catch (err) {
            console.log(err);
            }
      }

    // Sends a category to the Express app to be removed
    removeCategory = (data) =>{
        try {
            fetch('/removeCategory',{
                method: 'POST',
                body: JSON.stringify({
                    category: data,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'}
                })
                .then(res => console.log(`[INFO][CLIENT][API: /removeCategory]:`, res))}
                catch (err) {
                console.log(err);
                }
      }

    addChild = (dataItem) => {
        const newRecord = this.createNewItem();

        this.setState({
            inEdit: [ ...this.state.inEdit, newRecord ],
            expanded: [ ...this.state.expanded, dataItem.id ],
            data: modifySubItems(
                this.state.data,
                subItemsField,
                item => item.id === dataItem.id,
                subItems => [ newRecord, ...subItems ]
            )
        });
    }

    enterEdit = (dataItem) => {
        this.setState({
            inEdit: [ ...this.state.inEdit, extendDataItem(dataItem, subItemsField) ]
        });
    }

    save = (dataItem) => {
        const { isNew, inEdit, ...itemToSave } = dataItem;
        this.setState({
            data: mapTree(this.state.data, subItemsField, item => item.id === itemToSave.id ? itemToSave : item),
            inEdit: this.state.inEdit.filter(i => i.id !== itemToSave.id)
        });
        this.addCategory(itemToSave);
    }

    // Method for saving an edit since before it used the same save as add, This allows us to differentiate the two.
    editSave = (dataItem) => {
        const { isNew, inEdit, ...itemToSave } = dataItem;
        this.setState({
            data: mapTree(this.state.data, subItemsField, item => item.id === itemToSave.id ? itemToSave : item),
            inEdit: this.state.inEdit.filter(i => i.id !== itemToSave.id)
        });
        this.editCategory(itemToSave);
    }

    cancel = (editedItem) => {
        const { inEdit, data } = this.state;
        if (editedItem.isNew) {
            return this.remove(editedItem);
        }

        this.setState({
            data: mapTree(data, subItemsField,
                item => item.id === editedItem.id ? inEdit.find(i => i.id === item.id) : item),
            inEdit: inEdit.filter(i => i.id !== editedItem.id)
        });
    }

    remove = (dataItem) => {
        this.setState({
            data: removeItems(this.state.data, subItemsField, i => i.id === dataItem.id),
            inEdit: this.state.inEdit.filter(i => i.id !== dataItem.id)
        });
        this.removeCategory(dataItem);
    }

    // Separate component for buttons
    CommandCell = MyCommandCell(this.enterEdit, this.remove, this.save, this.editSave, this.cancel, this.addChild, editField);

    onExpandChange = (e) => {
        this.setState({
            expanded: e.value ?
                this.state.expanded.filter(id => id !== e.dataItem.id) :
                [ ...this.state.expanded, e.dataItem.id ]
        });
    }

    onItemChange = (event) => {
        this.setState({
            data: mapTree(
                this.state.data,
                subItemsField,
                item => item.id === event.dataItem.id ?
                    extendDataItem(item, subItemsField, { [event.field]: event.value }) : item
            )
        });
    }

    addRecord = () => {
        const newRecord = this.createNewItem();
        this.setState({
            data: [ newRecord, ...this.state.data ],
            inEdit: [ ...this.state.inEdit, { ...newRecord } ]
        });
    }

    createNewItem = () => {
        const timestamp = new Date().getTime();
        return { id: timestamp, isNew: true };
    }

    render() {
        const { data, expanded, inEdit } = this.state;

        return (
            <TreeList
                style={{ maxHeight: '510px', overflow: 'auto' }}
                data={mapTree(data, subItemsField, item =>
                    extendDataItem(item, subItemsField, {
                        [expandField]: expanded.includes(item.id),
                        [editField]: Boolean(inEdit.find(i => i.id === item.id))
                    }))
                }
                editField={editField}
                expandField={expandField}
                subItemsField={subItemsField}

                onItemChange={this.onItemChange}
                onExpandChange={this.onExpandChange}
                columns={[
                    { field: 'name', title: 'Category Name', width: 280, editCell: TreeListTextEditor, expandable: true },
                    { cell: this.CommandCell, width: 360 }
                ]}
                toolbar={
                    <TreeListToolbar>
                        <button
                            title="Add New Category"
                            className="k-button k-primary"
                            onClick={this.addRecord}
                        >
                            Add New Category
                        </button>
                    </TreeListToolbar>
                }
            />
        );
    }
}

export default FileStructure;