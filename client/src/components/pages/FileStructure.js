
import React from 'react';
import {
    TreeList, TreeListToolbar, mapTree, extendDataItem,
    removeItems, modifySubItems,
    TreeListTextEditor
} from '@progress/kendo-react-treelist';
import MyCommandCell from './my-command-cell.jsx';
import { TreeView, processTreeViewItems, handleTreeViewCheckChange, moveTreeViewItem, TreeViewDragAnalyzer, TreeViewDragClue } from '@progress/kendo-react-treeview'
import '@progress/kendo-react-animation'
import {CameraVideoFill} from 'react-bootstrap-icons';

const subItemsField = 'category';
const expandField = 'expanded';
const editField = 'inEdit';
const serverURL = "https://v8eklcakr9.execute-api.us-east-1.amazonaws.com";
// const isVideo = this.data.dataItem.isVideo;
// const style = {
//     backgroundColor: isVideo ?
//         "rgb(243, 23, 0, 0.32)" :
//         "rgb(55, 180, 0,0.32)"
// };
const is = (fileName, ext) => new RegExp(`.${ext}\$`).test(fileName);
const videoIcon = <React.Fragment><CameraVideoFill/></React.Fragment>;
class FileStructure extends React.Component {

    constructor(props){
        super(props);

    this.state = {
        data: [{}],
        expanded: [1],
        inEdit: [ ],
        awscategories: [],
        total: 1,
        parentID: null,
        isCat: true
    }

    this.addCategory = this.addCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    //this.iconClassName = this.iconClassName.bind(this);
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
        .then(awscategories => this.setState({ data: awscategories.data},
        () => console.log(`[INFO][CLIENT][API: /getFileStructureCategories]:`, awscategories.data[0])))
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
        console.log("hit add sub");
        console.log(dataItem);
        //set this since we are going to add a category 
        this.state.parentID = dataItem.id;

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

    addVideoContent = () => {
        //TODO: redirect to the add content page !!!
        window.location.replace("http://stackoverflow.com");
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
        //this.addCategory(itemToSave);

        console.log("this is my parent id: ", this.state.parentID);
        console.log("subitems field: "+ itemToSave);
        console.log(itemToSave);
        console.log(dataItem);
        console.log("Adding new Category");
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        try {
            fetch('https://789fzu64fd.execute-api.us-east-1.amazonaws.com/addCategory',{
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    name: dataItem.name,
                    parentID: this.state.parentID
                }),
                headers: {
                    "Content-Type": "text/plain"
                }
              })
              .then(res => res.json())}
            catch (err) {
                console.log(err);
            }
    }

    // Method for saving an edit since before it used the same save as add, This allows us to differentiate the two.
    editSave = (dataItem) => {
        const { isNew, inEdit, ...itemToSave } = dataItem;
        this.setState({
            data: mapTree(this.state.data, subItemsField, item => item.id === itemToSave.id ? itemToSave : item),
            inEdit: this.state.inEdit.filter(i => i.id !== itemToSave.id)
        });
        //this.editCategory(itemToSave);

        console.log("subitems field: "+ itemToSave);
        console.log(itemToSave);
        console.log(dataItem);
        console.log(dataItem.id);
        console.log("Editing!!");
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        //appended (Video) to the videos
        if(dataItem.name.includes("(Video)")){
            this.state.isCat = false;
        }

        try {
            fetch('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/editCategory',{
                method: 'POST',
                body: JSON.stringify({
                    name: dataItem.name,
                    id: dataItem.id,
                    isCat: this.state.isCat

                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "*"}
                    
              })
              .then(res => res.json())}
              catch (err) {
                console.log(err);
              }
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
        const isCat = true;
        this.setState({
            data: removeItems(this.state.data, subItemsField, i => i.id === dataItem.id),
            inEdit: this.state.inEdit.filter(i => i.id !== dataItem.id)
        });
        //this.removeCategory(dataItem);

        console.log("this is what im removing: ");
        console.log(dataItem);
        console.log("Removing!!");
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        //appended "(Video)"" to the videos
        if(dataItem.name.includes("(Video)")){
            this.state.isCat = false;
        }

        try {
            fetch('https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/removeCategory',{
                method: 'POST',
                body: JSON.stringify({
                    id: dataItem.id,
                    isCat: this.state.isCat
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "*"}
              })
              .then(res => res.json())}
              catch (err) {
                console.log(err);
              }
    }

    // Separate component for buttons
    CommandCell = MyCommandCell(this.enterEdit, this.remove, this.save, this.editSave, this.cancel, this.addChild, editField, this.addVideoContent);

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
        console.log(data);

        return (
            <React.Fragment>
            <TreeList
                style={{ maxHeight: '510px', overflow: 'auto' }}
                data={mapTree(data, subItemsField, item =>(
                    extendDataItem(item, subItemsField, {
                        [expandField]: expanded.includes(item.id),
                        [editField]: Boolean(inEdit.find(i => i.id === item.id) )
                    }
                    //,this.iconClassName(item.id, data)
                )
                ))
                    
                }

                item={data =>
                    [<span className={this.iconClassName(this.data)} key='0'></span>, this.data]
                }

                // itemRender={mapTree(data, props =>(
                //     [<span className={this.iconClassName(props.item)} key='0'></span>, props.item.name]
                // )}
                // iconClassName = {iconClassName}
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
            </React.Fragment>
        );
    }
}

export default FileStructure;