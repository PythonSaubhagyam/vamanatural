const SERVER_URL = window.location.origin;

const ERPNavbarLinks = {
  Calendar: [
    {
      title: "Events",
      href: "/calendar/events",
    },
    {
      title: "Online Appointments",
      href: "/calendar/online-appointments",
    },
  ],
  Contacts: [
    {
      title: "Customers",
      href: "/contacts/customers",
    },
    {
      title: "Vendors",
      href: "/contacts/vendors",
    },
    {
      title: "Contact tags",
      href: "/contacts/contact-tags",
    },
  ],
  Sales: [
    {
      title: "Customers",
      href: "/contacts/customers",
    },
    {
      title: "Quotations",
      href: "/sales?sales_type=quotations",
    },
    {
      title: "Sales",
      href: "/sales?sales_type=sales",
    },
  ],
  Website: [
    // {
    //   title: "Online Appointments",
    //   href: "/website/online-appointment-settings",
    // },
    {
      title: "Unpaid orders",
      href: "/website/unpaid-order",
    },
  ],
  Purchase: [
    {
      title: "Requests for Quotation",
      href: "/purchase?type=RFQ",
    },
    {
      title: "Purchase Orders",
      href: "/purchase?type=Purchase-Orders",
    },
  ],
  Manufacturing: [
    {
      title: "Manufacturing Orders",
      href: "/manufacturing/manufacturing-orders",
    },
    {
      title: "Unbuild Orders",
      href: "/manufacturing/unbuild-orders",
    },
    {
      title: "Scrap Orders",
      href: "/manufacturing/scrap-orders",
    },
  ],
  Inventory: [
    {
      title: "Transfers",
      href: "/inventory/transfers",
    },
    {
      title: "Adjustments",
      href: "/inventory/adjustments",
    },
    {
      title: "Scrap Orders",
      href: "/inventory/scrap-orders",
    },
    {
      title: "Inventory Reports",
      href: "/inventory/inventory-reports",
    },
  ],
  Projects: [
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Tasks",
      href: "/projects/tasks",
    },
  ],
  Events: [
    {
      title: "Online Appointments",
      href: "/calendar/online-appointments",
    },
    {
      title: "Offline Appointments",
      href: "/events/offline-appointments",
    },
    {
      title: "Online Appointment Slots",
      href: "/events/online-appointment-slots",
    },
  ],
  Configurations: [
    {
      title: "Brands",
      href: "/configurations/brands",
    },
    {
      title: "Companies",
      href: "/configurations/companies",
    },
    {
      title: "Categories",
      href: "/configurations/categories",
    },
    {
      title: "Reporting Categories",
      href: "/configurations/reporting-categories",
    },
    {
      title: "Products",
      href: "/configurations/products",
    },
  ],
  PointOfSales: [
    {
      title: "Orders",
      href: "/point-of-sale/orders",
    },
    {
      title: "Sessions",
      href: "/point-of-sale/sessions",
    },
    {
      title: "Payments",
      href: "/point-of-sale/payments",
    },
  ],
  Employees: [
    {
      title: "Departments",
      href: "/employees/departments",
    },
    {
      title: "Job Positions",
      href: "/employees/job-positions",
    },
  ],
  Surveys: [
    {
      title: "Survey Question",
      href: "/surveys/surveys-question",
    },
  ],
  Accounting: [
    {
      title: "Invoices",
      href: "/accounting/invoices",
    },
    {
      title: "Credit Notes",
      href: "/accounting/credit-notes",
    },
    {
      title: "Bill",
      href: "/accounting/bill",
    },
    {
      title: "Journal Entries",
      href: "/accounting/journal-entries",
    },
    {
      title: "Refund",
      href: "/accounting/refund",
    },
  ],
};
const ERPReportingLinks = {
  Accounting: [
    {
      title: "Profit Loss",
      href: "/accounting/profit-loss",
    },
    {
      title: "Balance Sheet",
      href: "/accounting/balance-sheet",
    },
    {
      title: "Aged Receivable",
      href: "/accounting/aged-receivable",
    },
    {
      title: "Aged Payable",
      href: "/accounting/aged-payable",
    },
    {
      title: "Partner Ledger",
      href: "/accounting/partner-ledger",
    },
    {
      title: "General Ledger",
      href: "/accounting/general-ledger",
    },
  ],
};

const ERPConfigLinks = {
  Contacts: [
    {
      title: "Cities",
      href: "/contacts/cities",
    },
    {
      title: "States",
      href: "/contacts/states",
    },
    {
      title: "Countries",
      href: "/contacts/countries",
    },
    {
      title: "Country Groups",
      href: "/contacts/country-groups",
    },
  ],
  Sales: [
    {
      title: "Products",
      href: "/configurations/products",
    },
  ],
  Purchase: [
    {
      title: "Products",
      href: "/configurations/products",
    },
    {
      title: "Vendors",
      href: "/contacts/vendors",
    },
    {
      title: "Vendor Pricelists",
      href: "/purchase/vendor-pricelists",
    },
  ],
  Manufacturing: [
    {
      title: "Bills of Materials",
      href: "/manufacturing/bills-of-materials",
    },
    {
      title: "Lots/Serial Numbers",
      href: "/manufacturing/lot-numbers", 
    }, 
    {
      title: "Work Centers",
      href: "/manufacturing/work-centers",
    },
  ],
  Employees: [
    {
      title: "Job Positions",
      href: "/employees/job-positions",
    },
    {
      title: "Departments",
      href: "/employees/departments",
    },
  ],
  PointOfSales: [
    {
      title: "Products",
      href: "/configurations/products",
    },
    {
      title: "Pricelists",
      href: "/point-of-sale/pricelists",
    },
    {
      title: "Point of sales",
      href: "/point-of-sale/point-of-sale",
    },
  ],
  Inventory: [
    {
      title: "Warehouses",
      href: "/inventory/warehouses",
    },
    {
      title: "Locations",
      href: "/inventory/locations",
    },
    {
      title: "Rules",
      href: "/inventory/rules",
    },
    {
      title: "Reordering Rules",
      href: "/inventory/reordering-rules",
    },
    {
      title: "Routes",
      href: "/inventory/routes",
    },
    {
      title: "Package Types",
      href: "/inventory/package-types",
    },
    {
      title: "Operation Types",
      href: "/inventory/operation-types",
    },
  ],
  Accounting: [
    {
      title: "Payment Terms",
      href: "/accounting/payment-terms",
    },
    {
      title: "Taxes",
      href: "/accounting/taxes",
    },
    {
      title: "Fiscal Positions",
      href: "/accounting/fiscal-positions",
    },
    {
      title: "Incoterms",
      href: "/accounting/incoterms",
    },
    {
      title: "Journals",
      href: "/accounting/journals",
    },

    {
      title: "Chart Of Accounts",
      href: "/accounting/chart-of-account",
    },
  ],
  Website: [
    {
      title: "Unpaid orders",
      href: "/sales/?unpaid=unpaid",
    },
  ],
};

export { SERVER_URL, ERPNavbarLinks, ERPConfigLinks, ERPReportingLinks };
