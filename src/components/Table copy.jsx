import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

export default function Table({
  columns,
  data,
  selectable = false,
  onRowClick,
  expandableRows = false,
  expandOnRowClicked = false,
  expandableRowsComponent = null,
  displayExtensions = true,
  dense = true,
  noDataText = "There are no records to display",
}) {
  const tableData = {
    columns,
    data,
  };

  const table = (
    <DataTable
      columns={columns}
      data={data}
      responsive
      pagination
      fixedHeader
      selectableRowsHighlight
      paginationPerPage={20}
      paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
      noDataComponent={noDataText}
      expandableRows={expandableRows}
      expandOnRowClicked={expandOnRowClicked}
      expandableRowsComponent={expandableRowsComponent}
      selectableRows={selectable}
      onRowClicked={onRowClick}
      dense={dense}
    />
  );

  return (
    <>
      {displayExtensions === true ? (
        <DataTableExtensions
          {...tableData}
          export={false}
          print={false}
          filterPlaceholder="Search"
          filterDigit={1}
        >
          {table}
        </DataTableExtensions>
      ) : (
        table
      )}
    </>
  );
}
