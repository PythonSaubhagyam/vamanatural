import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
createTheme(
  "solarized",
  {
    text: {
      primary: "black",
      secondary: "#2aa198",
    },
    background: {
      default: "#ffffff",
    },
    context: {
      background: "#ffffff",
      text: "#FFFFFF",
    },
    divider: {
      default: "#ffffff",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "80px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default function Table({
  columns,
  data,
  selectable = false,
  onRowClick,
  expandableRows = false,
  expandOnRowClicked = false,
  expandableRowsComponent = null,
  displayExtensions = false,
  dense = true,
  noDataText = "",
  serverSidePagination = false,
  totalRows,
  onChangePage,
  loadingRecords,
  paginationPerPage,
  onChangeRowsPerPage,
  pagination = true,
  setSelectedRows = () => {},
  selectedRows,
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
      paginationServer={serverSidePagination}
      paginationPerPage={paginationPerPage ? paginationPerPage : 50}
      paginationTotalRows={totalRows}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      fixedHeader
      selectableRowsHighlight
      progressPending={loadingRecords}
      paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
      noDataComponent={noDataText}
      expandableRows={expandableRows}
      expandOnRowClicked={expandOnRowClicked}
      expandableRowsComponent={expandableRowsComponent}
      selectableRows={selectable}
      onRowClicked={onRowClick}
      dense={dense}
      customStyles={customStyles}
      pagination={pagination}
      onSelectedRowsChange={(rows) =>
        setSelectedRows(rows.selectedRows.map((row) => row.id))
      }
      // theme="solarized"
    />
  );

  return (
    <>
      {displayExtensions === true ? (
        <DataTableExtensions
          {...tableData}
          export={false}
          print={false}
          // filterPlaceholder="Search"
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
