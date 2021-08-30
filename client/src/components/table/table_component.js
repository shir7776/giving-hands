import React, { useState,Component } from 'react';
import MaterialTable from 'material-table';

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:props.data,
            columns:props.columns,
            update:props.update,
            delete:props.delete,
            add:props.add,
            name:props.name
        }
        console.log(this.state.columns)
    }
    render() {


        // const [data, setData] = useState(givers)
        return (
            <div>
                <MaterialTable title={this.state.name}
                               data={this.state.data}
                               columns={this.state.columns}
                               editable={{
                                   onRowAdd:this.props.add? (newRow) => new Promise((resolve, reject) => {
                                       let id=Math.floor(Math.random() * 1000);
                                       const updatedRows = [...this.state.data, {id:id , ...newRow}]
                                       setTimeout(() => {
                                           // setData(updatedRows)
                                           this.setState({
                                               data:updatedRows
                                           });
                                           this.state.add({id:id , ...newRow})
                                           resolve()
                                       }, 100)
                                   }):null,
                                   onRowDelete:this.props.delete? selectedRow => new Promise((resolve, reject) => {
                                       const index = selectedRow.tableData.id;
                                       const updatedRows = [...this.state.data];
                                       const deletedRow=updatedRows[index]
                                       updatedRows.splice(index, 1);
                                       setTimeout(() => {
                                           // setData(updatedRows)
                                           this.setState({
                                               data:updatedRows
                                           });
                                           this.state.delete(deletedRow);
                                           resolve()
                                       }, 100)
                                   }):null,
                                   onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                       const index = oldRow.tableData.id;
                                       const updatedRows = [...this.state.data]
                                       updatedRows[index] = updatedRow
                                       setTimeout(() => {
                                           // setData(updatedRows)
                                           this.setState({
                                               data:updatedRows
                                           })
                                           this.state.update(updatedRows[index])
                                           resolve()
                                       }, 100)
                                   })

                               }}
                               options={{
                                   actionsColumnIndex: -1, addRowPosition: "first",filtering:true, selection:this.props.selection
                               }}
                               style={{"backgroundColor":"#f7fafb"}}
                               onSelectionChange={(rows) => {
                               this.props.onSelectionChange(rows)
                               }
                               }

                />
            </div>
        );
    };
}


export default Table