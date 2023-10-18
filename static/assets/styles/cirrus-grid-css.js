/*
    cirrus styles in exported constant
*/
import {css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export const cirrusGrid= css`
  /*
  * Cirrus 0.7.1
  * Stanley Lim, Copyright 2022
  * https://spiderpig86.github.io/Cirrus
  */

/* Use for spacing out elements vertically */
.row {
  flex: 1;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  display: flex;
  /* GRID */
  /* Auto align col to left in row */
  /* Auto align col to middle in row */
  /* Auto align col to right in row */
  /* Dividers for mobile layout */
  /* Base sizing where everything is 100% width */
  /* Column sizes for various viewports */
  /* Columns without the spacing */
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

.row.row--no-wrap {
  flex-wrap: nowrap;
  overflow-x: auto; /* Can be disabled to remove scroll bar */
}

.row .col {
  display: block;
  flex: 1;
  padding: 0.15rem 0.75rem;
}

.row .offset-right {
  margin-left: 0;
  margin-right: auto;
}

.row .offset-center {
  margin-left: auto;
  margin-right: auto;
}

.row .offset-left {
  margin-left: auto;
  margin-right: 0;
}

.row.divided [class^=col], .row.divided [class*=" col"] {
  box-shadow: 0 -1px 0 0 rgba(173, 181, 189, 0.5);
}

.row [class^=col-],
.row [class*=" col-"] {
  width: 100%;
  margin-left: 0;
  padding: 0 0.5rem;
}

@media screen and (min-width: 768px) {
  .row .col-1 {
    width: 10%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-2 {
    width: 20%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-3 {
    width: 30%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-4 {
    width: 40%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-5 {
    width: 60%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-6 {
    width: 60%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-7 {
    width: 70%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-8 {
    width: 66.80%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-9 {
    width: 90%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-10 {
    width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-xs-1 {
    width: 10%;
  }

  .row .col-xs-2 {
    width: 20%;
  }

  .row .col-xs-3 {
    width: 30%;
  }

  .row .col-xs-4 {
    width: 40%;
  }

  .row .col-xs-5 {
    width: 60%;
  }

  .row .col-xs-6 {
    width: 60%;
  }

  .row .col-xs-7 {
    width: 70%;
  }

  .row .col-xs-8 {
    width: 66.80%;
  }

  .row .col-xs-9 {
    width: 90%;
  }

  .row .col-xs-10 {
    width: 100%;
  }
}
@media screen and (min-width: 640px) {
  .row .col-sm-1 {
    width: 10%;
  }
  .row .col-sm-2 {
    width: 20%;
  }
  .row .col-sm-3 {
    width: 30%;
  }
  .row .col-sm-4 {
    width: 40%;
  }
  .row .col-sm-5 {
    width: 60%;
  }
  .row .col-sm-6 {
    width: 60%;
  }
  .row .col-sm-7 {
    width: 70%;
  }
  .row .col-sm-8 {
    width: 66.80%;
  }
  .row .col-sm-9 {
    width: 90%;
  }
  .row .col-sm-10 {
    width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .row .col-md-1 {
    width: 10%;
  }
  .row .col-md-2 {
    width: 20%;
  }
  .row .col-md-3 {
    width: 30%;
  }
  .row .col-md-4 {
    width: 40%;
  }
  .row .col-md-5 {
    width: 60%;
  }
  .row .col-md-6 {
    width: 60%;
  }
  .row .col-md-7 {
    width: 70%;
  }
  .row .col-md-8 {
    width: 66.80%;
  }
  .row .col-md-9 {
    width: 90%;
  }
  .row .col-md-10 {
    width: 100%;
  }
}
@media screen and (min-width: 1024px) {
  .row .col-lg-1 {
    width: 10%;
  }
  .row .col-lg-2 {
    width: 20%;
  }
  .row .col-lg-3 {
    width: 30%;
  }
  .row .col-lg-4 {
    width: 40%;
  }
  .row .col-lg-5 {
    width: 60%;
  }
  .row .col-lg-6 {
    width: 60%;
  }
  .row .col-lg-7 {
    width: 70%;
  }
  .row .col-lg-8 {
    width: 66.80%;
  }
  .row .col-lg-9 {
    width: 90%;
  }
  .row .col-lg-10 {
    width: 100%;
  }
}
@media screen and (min-width: 1280px) {
  .row .col-xl-1 {
    width: 10%;
  }
  .row .col-xl-2 {
    width: 20%;
  }
  .row .col-xl-3 {
    width: 30%;
  }
  .row .col-xl-4 {
    width: 40%;
  }
  .row .col-xl-5 {
    width: 60%;
  }
  .row .col-xl-6 {
    width: 60%;
  }
  .row .col-xl-7 {
    width: 70%;
  }
  .row .col-xl-8 {
    width: 66.80%;
  }
  .row .col-xl-9 {
    width: 90%;
  }
  .row .col-xl-10 {
    width: 100%;
  }
  .row .col-xl-11 {
    width: 91.80%;
  }
  .row .col-xl-12 {
    width: 100%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-1 {
    margin-left: 10%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-2 {
    margin-left: 20%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-3 {
    margin-left: 30%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-4 {
    margin-left: 40%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-5 {
    margin-left: 50%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-6 {
    margin-left: 50%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-7 {
    margin-left: 70%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-8 {
    margin-left: 66.80%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-9 {
    margin-left: 75%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-10 {
    margin-left: 100%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-11 {
    margin-left: 91.80%;
  }
}
@media screen and (min-width: 640px) {
  .row .offset-12 {
    margin-left: 100%;
  }
}
.row.no-space [class^=col-], .row.no-space [class*=" col-"] {
  padding: 0;
}


  /* GRID */
  :root {
    --grid-template-column: repeat(12, minmax(0, 1fr));
    --grid-column-start: auto;
    --grid-column-end: auto;
    --grid-row-start: auto;
    --grid-row-end: auto;
  }

  .grid {
    display: grid;
    grid-gap: var(--grid-gap);
    grid-template-columns: var(--grid-template-column);
  }

  /* Templates */
  .grid-cols-1 {
    --grid-template-column: repeat(1, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-1 {
    grid-column: span 1/span 1;
  }

  /* Row expansion */
  .grid-r-1 {
    grid-row: span 1/span 1;
  }

  /* Cell Column Start/End */
  .grid-cs-1 {
    grid-column-start: 1;
  }

  .grid-ce-1 {
    grid-column-end: 2;
  }

  /* Cell Row Start/End */
  .grid-rs-1 {
    grid-row-start: 1;
  }

  .grid-re-1 {
    grid-row-end: 2;
  }

  /* Templates */
  .grid-cols-2 {
    --grid-template-column: repeat(2, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-2 {
    grid-column: span 2/span 2;
  }

  /* Row expansion */
  .grid-r-2 {
    grid-row: span 2/span 2;
  }

  /* Cell Column Start/End */
  .grid-cs-2 {
    grid-column-start: 2;
  }

  .grid-ce-2 {
    grid-column-end: 3;
  }

  /* Cell Row Start/End */
  .grid-rs-2 {
    grid-row-start: 2;
  }

  .grid-re-2 {
    grid-row-end: 3;
  }

  /* Templates */
  .grid-cols-3 {
    --grid-template-column: repeat(3, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-3 {
    grid-column: span 3/span 3;
  }

  /* Row expansion */
  .grid-r-3 {
    grid-row: span 3/span 3;
  }

  /* Cell Column Start/End */
  .grid-cs-3 {
    grid-column-start: 3;
  }

  .grid-ce-3 {
    grid-column-end: 4;
  }

  /* Cell Row Start/End */
  .grid-rs-3 {
    grid-row-start: 3;
  }

  .grid-re-3 {
    grid-row-end: 4;
  }

  /* Templates */
  .grid-cols-4 {
    --grid-template-column: repeat(4, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-4 {
    grid-column: span 4/span 4;
  }

  /* Row expansion */
  .grid-r-4 {
    grid-row: span 4/span 4;
  }

  /* Cell Column Start/End */
  .grid-cs-4 {
    grid-column-start: 4;
  }

  .grid-ce-4 {
    grid-column-end: 5;
  }

  /* Cell Row Start/End */
  .grid-rs-4 {
    grid-row-start: 4;
  }

  .grid-re-4 {
    grid-row-end: 5;
  }

  /* Templates */
  .grid-cols-5 {
    --grid-template-column: repeat(5, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-5 {
    grid-column: span 5/span 5;
  }

  /* Row expansion */
  .grid-r-5 {
    grid-row: span 5/span 5;
  }

  /* Cell Column Start/End */
  .grid-cs-5 {
    grid-column-start: 5;
  }

  .grid-ce-5 {
    grid-column-end: 6;
  }

  /* Cell Row Start/End */
  .grid-rs-5 {
    grid-row-start: 5;
  }

  .grid-re-5 {
    grid-row-end: 6;
  }

  /* Templates */
  .grid-cols-6 {
    --grid-template-column: repeat(6, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-6 {
    grid-column: span 6/span 6;
  }

  /* Row expansion */
  .grid-r-6 {
    grid-row: span 6/span 6;
  }

  /* Cell Column Start/End */
  .grid-cs-6 {
    grid-column-start: 6;
  }

  .grid-ce-6 {
    grid-column-end: 7;
  }

  /* Cell Row Start/End */
  .grid-rs-6 {
    grid-row-start: 6;
  }

  .grid-re-6 {
    grid-row-end: 7;
  }

  /* Templates */
  .grid-cols-7 {
    --grid-template-column: repeat(7, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-7 {
    grid-column: span 7/span 7;
  }

  /* Row expansion */
  .grid-r-7 {
    grid-row: span 7/span 7;
  }

  /* Cell Column Start/End */
  .grid-cs-7 {
    grid-column-start: 7;
  }

  .grid-ce-7 {
    grid-column-end: 8;
  }

  /* Cell Row Start/End */
  .grid-rs-7 {
    grid-row-start: 7;
  }

  .grid-re-7 {
    grid-row-end: 8;
  }

  /* Templates */
  .grid-cols-8 {
    --grid-template-column: repeat(8, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-8 {
    grid-column: span 8/span 8;
  }

  /* Row expansion */
  .grid-r-8 {
    grid-row: span 8/span 8;
  }

  /* Cell Column Start/End */
  .grid-cs-8 {
    grid-column-start: 8;
  }

  .grid-ce-8 {
    grid-column-end: 9;
  }

  /* Cell Row Start/End */
  .grid-rs-8 {
    grid-row-start: 8;
  }

  .grid-re-8 {
    grid-row-end: 9;
  }

  /* Templates */
  .grid-cols-9 {
    --grid-template-column: repeat(9, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-9 {
    grid-column: span 9/span 9;
  }

  /* Row expansion */
  .grid-r-9 {
    grid-row: span 9/span 9;
  }

  /* Cell Column Start/End */
  .grid-cs-9 {
    grid-column-start: 9;
  }

  .grid-ce-9 {
    grid-column-end: 10;
  }

  /* Cell Row Start/End */
  .grid-rs-9 {
    grid-row-start: 9;
  }

  .grid-re-9 {
    grid-row-end: 10;
  }

  /* Templates */
  .grid-cols-10 {
    --grid-template-column: repeat(10, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-10 {
    grid-column: span 10/span 10;
  }

  /* Row expansion */
  .grid-r-10 {
    grid-row: span 10/span 10;
  }

  /* Cell Column Start/End */
  .grid-cs-10 {
    grid-column-start: 10;
  }

  .grid-ce-10 {
    grid-column-end: 11;
  }

  /* Cell Row Start/End */
  .grid-rs-10 {
    grid-row-start: 10;
  }

  .grid-re-10 {
    grid-row-end: 11;
  }

  /* Templates */
  .grid-cols-11 {
    --grid-template-column: repeat(11, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-11 {
    grid-column: span 11/span 11;
  }

  /* Row expansion */
  .grid-r-11 {
    grid-row: span 11/span 11;
  }

  /* Cell Column Start/End */
  .grid-cs-11 {
    grid-column-start: 11;
  }

  .grid-ce-11 {
    grid-column-end: 12;
  }

  /* Cell Row Start/End */
  .grid-rs-11 {
    grid-row-start: 11;
  }

  .grid-re-11 {
    grid-row-end: 12;
  }

  /* Templates */
  .grid-cols-12 {
    --grid-template-column: repeat(12, minmax(0, 1fr));
  }

  /* Column expansion */
  .grid-c-12 {
    grid-column: span 12/span 12;
  }

  /* Row expansion */
  .grid-r-12 {
    grid-row: span 12/span 12;
  }

  /* Cell Column Start/End */
  .grid-cs-12 {
    grid-column-start: 12;
  }

  .grid-ce-12 {
    grid-column-end: 13;
  }

  /* Cell Row Start/End */
  .grid-rs-12 {
    grid-row-start: 12;
  }

  .grid-re-12 {
    grid-row-end: 13;
  }

  .grid-ce-end {
    grid-column-end: -1;
  }

  .grid-re-end {
    grid-row-end: -1;
  }

  .grid-ce-auto {
    grid-column-end: auto;
  }

  .grid-re-auto {
    grid-row-end: auto;
  }

  @media screen and (min-width: 640px) {
    .grid-sm {
      display: grid;
      grid-gap: var(--grid-gap);
      grid-template-columns: var(--grid-template-column);
    }
    /* Templates */
    .grid-cols-1-sm {
      --grid-template-column: repeat(1, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-1-sm {
      grid-column: span 1/span 1;
    }
    /* Row expansion */
    .grid-r-1-sm {
      grid-row: span 1/span 1;
    }
    /* Cell Column Start/End */
    .grid-cs-1-sm {
      grid-column-start: 1;
    }
    .grid-ce-1-sm {
      grid-column-end: 2;
    }
    /* Cell Row Start/End */
    .grid-rs-1-sm {
      grid-row-start: 1;
    }
    .grid-re-1-sm {
      grid-row-end: 2;
    }
    /* Templates */
    .grid-cols-2-sm {
      --grid-template-column: repeat(2, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-2-sm {
      grid-column: span 2/span 2;
    }
    /* Row expansion */
    .grid-r-2-sm {
      grid-row: span 2/span 2;
    }
    /* Cell Column Start/End */
    .grid-cs-2-sm {
      grid-column-start: 2;
    }
    .grid-ce-2-sm {
      grid-column-end: 3;
    }
    /* Cell Row Start/End */
    .grid-rs-2-sm {
      grid-row-start: 2;
    }
    .grid-re-2-sm {
      grid-row-end: 3;
    }
    /* Templates */
    .grid-cols-3-sm {
      --grid-template-column: repeat(3, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-3-sm {
      grid-column: span 3/span 3;
    }
    /* Row expansion */
    .grid-r-3-sm {
      grid-row: span 3/span 3;
    }
    /* Cell Column Start/End */
    .grid-cs-3-sm {
      grid-column-start: 3;
    }
    .grid-ce-3-sm {
      grid-column-end: 4;
    }
    /* Cell Row Start/End */
    .grid-rs-3-sm {
      grid-row-start: 3;
    }
    .grid-re-3-sm {
      grid-row-end: 4;
    }
    /* Templates */
    .grid-cols-4-sm {
      --grid-template-column: repeat(4, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-4-sm {
      grid-column: span 4/span 4;
    }
    /* Row expansion */
    .grid-r-4-sm {
      grid-row: span 4/span 4;
    }
    /* Cell Column Start/End */
    .grid-cs-4-sm {
      grid-column-start: 4;
    }
    .grid-ce-4-sm {
      grid-column-end: 5;
    }
    /* Cell Row Start/End */
    .grid-rs-4-sm {
      grid-row-start: 4;
    }
    .grid-re-4-sm {
      grid-row-end: 5;
    }
    /* Templates */
    .grid-cols-5-sm {
      --grid-template-column: repeat(5, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-5-sm {
      grid-column: span 5/span 5;
    }
    /* Row expansion */
    .grid-r-5-sm {
      grid-row: span 5/span 5;
    }
    /* Cell Column Start/End */
    .grid-cs-5-sm {
      grid-column-start: 5;
    }
    .grid-ce-5-sm {
      grid-column-end: 6;
    }
    /* Cell Row Start/End */
    .grid-rs-5-sm {
      grid-row-start: 5;
    }
    .grid-re-5-sm {
      grid-row-end: 6;
    }
    /* Templates */
    .grid-cols-6-sm {
      --grid-template-column: repeat(6, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-6-sm {
      grid-column: span 6/span 6;
    }
    /* Row expansion */
    .grid-r-6-sm {
      grid-row: span 6/span 6;
    }
    /* Cell Column Start/End */
    .grid-cs-6-sm {
      grid-column-start: 6;
    }
    .grid-ce-6-sm {
      grid-column-end: 7;
    }
    /* Cell Row Start/End */
    .grid-rs-6-sm {
      grid-row-start: 6;
    }
    .grid-re-6-sm {
      grid-row-end: 7;
    }
    /* Templates */
    .grid-cols-7-sm {
      --grid-template-column: repeat(7, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-7-sm {
      grid-column: span 7/span 7;
    }
    /* Row expansion */
    .grid-r-7-sm {
      grid-row: span 7/span 7;
    }
    /* Cell Column Start/End */
    .grid-cs-7-sm {
      grid-column-start: 7;
    }
    .grid-ce-7-sm {
      grid-column-end: 8;
    }
    /* Cell Row Start/End */
    .grid-rs-7-sm {
      grid-row-start: 7;
    }
    .grid-re-7-sm {
      grid-row-end: 8;
    }
    /* Templates */
    .grid-cols-8-sm {
      --grid-template-column: repeat(8, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-8-sm {
      grid-column: span 8/span 8;
    }
    /* Row expansion */
    .grid-r-8-sm {
      grid-row: span 8/span 8;
    }
    /* Cell Column Start/End */
    .grid-cs-8-sm {
      grid-column-start: 8;
    }
    .grid-ce-8-sm {
      grid-column-end: 9;
    }
    /* Cell Row Start/End */
    .grid-rs-8-sm {
      grid-row-start: 8;
    }
    .grid-re-8-sm {
      grid-row-end: 9;
    }
    /* Templates */
    .grid-cols-9-sm {
      --grid-template-column: repeat(9, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-9-sm {
      grid-column: span 9/span 9;
    }
    /* Row expansion */
    .grid-r-9-sm {
      grid-row: span 9/span 9;
    }
    /* Cell Column Start/End */
    .grid-cs-9-sm {
      grid-column-start: 9;
    }
    .grid-ce-9-sm {
      grid-column-end: 10;
    }
    /* Cell Row Start/End */
    .grid-rs-9-sm {
      grid-row-start: 9;
    }
    .grid-re-9-sm {
      grid-row-end: 10;
    }
    /* Templates */
    .grid-cols-10-sm {
      --grid-template-column: repeat(10, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-10-sm {
      grid-column: span 10/span 10;
    }
    /* Row expansion */
    .grid-r-10-sm {
      grid-row: span 10/span 10;
    }
    /* Cell Column Start/End */
    .grid-cs-10-sm {
      grid-column-start: 10;
    }
    .grid-ce-10-sm {
      grid-column-end: 11;
    }
    /* Cell Row Start/End */
    .grid-rs-10-sm {
      grid-row-start: 10;
    }
    .grid-re-10-sm {
      grid-row-end: 11;
    }
    /* Templates */
    .grid-cols-11-sm {
      --grid-template-column: repeat(11, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-11-sm {
      grid-column: span 11/span 11;
    }
    /* Row expansion */
    .grid-r-11-sm {
      grid-row: span 11/span 11;
    }
    /* Cell Column Start/End */
    .grid-cs-11-sm {
      grid-column-start: 11;
    }
    .grid-ce-11-sm {
      grid-column-end: 12;
    }
    /* Cell Row Start/End */
    .grid-rs-11-sm {
      grid-row-start: 11;
    }
    .grid-re-11-sm {
      grid-row-end: 12;
    }
    /* Templates */
    .grid-cols-12-sm {
      --grid-template-column: repeat(12, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-12-sm {
      grid-column: span 12/span 12;
    }
    /* Row expansion */
    .grid-r-12-sm {
      grid-row: span 12/span 12;
    }
    /* Cell Column Start/End */
    .grid-cs-12-sm {
      grid-column-start: 12;
    }
    .grid-ce-12-sm {
      grid-column-end: 13;
    }
    /* Cell Row Start/End */
    .grid-rs-12-sm {
      grid-row-start: 12;
    }
    .grid-re-12-sm {
      grid-row-end: 13;
    }
    .grid-ce-end-sm {
      grid-column-end: -1;
    }
    .grid-re-end-sm {
      grid-row-end: -1;
    }
    .grid-ce-auto-sm {
      grid-column-end: auto;
    }
    .grid-re-auto-sm {
      grid-row-end: auto;
    }
  }
  @media screen and (min-width: 768px) {
    .grid-md {
      display: grid;
      grid-gap: var(--grid-gap);
      grid-template-columns: var(--grid-template-column);
    }
    /* Templates */
    .grid-cols-1-md {
      --grid-template-column: repeat(1, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-1-md {
      grid-column: span 1/span 1;
    }
    /* Row expansion */
    .grid-r-1-md {
      grid-row: span 1/span 1;
    }
    /* Cell Column Start/End */
    .grid-cs-1-md {
      grid-column-start: 1;
    }
    .grid-ce-1-md {
      grid-column-end: 2;
    }
    /* Cell Row Start/End */
    .grid-rs-1-md {
      grid-row-start: 1;
    }
    .grid-re-1-md {
      grid-row-end: 2;
    }
    /* Templates */
    .grid-cols-2-md {
      --grid-template-column: repeat(2, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-2-md {
      grid-column: span 2/span 2;
    }
    /* Row expansion */
    .grid-r-2-md {
      grid-row: span 2/span 2;
    }
    /* Cell Column Start/End */
    .grid-cs-2-md {
      grid-column-start: 2;
    }
    .grid-ce-2-md {
      grid-column-end: 3;
    }
    /* Cell Row Start/End */
    .grid-rs-2-md {
      grid-row-start: 2;
    }
    .grid-re-2-md {
      grid-row-end: 3;
    }
    /* Templates */
    .grid-cols-3-md {
      --grid-template-column: repeat(3, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-3-md {
      grid-column: span 3/span 3;
    }
    /* Row expansion */
    .grid-r-3-md {
      grid-row: span 3/span 3;
    }
    /* Cell Column Start/End */
    .grid-cs-3-md {
      grid-column-start: 3;
    }
    .grid-ce-3-md {
      grid-column-end: 4;
    }
    /* Cell Row Start/End */
    .grid-rs-3-md {
      grid-row-start: 3;
    }
    .grid-re-3-md {
      grid-row-end: 4;
    }
    /* Templates */
    .grid-cols-4-md {
      --grid-template-column: repeat(4, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-4-md {
      grid-column: span 4/span 4;
    }
    /* Row expansion */
    .grid-r-4-md {
      grid-row: span 4/span 4;
    }
    /* Cell Column Start/End */
    .grid-cs-4-md {
      grid-column-start: 4;
    }
    .grid-ce-4-md {
      grid-column-end: 5;
    }
    /* Cell Row Start/End */
    .grid-rs-4-md {
      grid-row-start: 4;
    }
    .grid-re-4-md {
      grid-row-end: 5;
    }
    /* Templates */
    .grid-cols-5-md {
      --grid-template-column: repeat(5, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-5-md {
      grid-column: span 5/span 5;
    }
    /* Row expansion */
    .grid-r-5-md {
      grid-row: span 5/span 5;
    }
    /* Cell Column Start/End */
    .grid-cs-5-md {
      grid-column-start: 5;
    }
    .grid-ce-5-md {
      grid-column-end: 6;
    }
    /* Cell Row Start/End */
    .grid-rs-5-md {
      grid-row-start: 5;
    }
    .grid-re-5-md {
      grid-row-end: 6;
    }
    /* Templates */
    .grid-cols-6-md {
      --grid-template-column: repeat(6, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-6-md {
      grid-column: span 6/span 6;
    }
    /* Row expansion */
    .grid-r-6-md {
      grid-row: span 6/span 6;
    }
    /* Cell Column Start/End */
    .grid-cs-6-md {
      grid-column-start: 6;
    }
    .grid-ce-6-md {
      grid-column-end: 7;
    }
    /* Cell Row Start/End */
    .grid-rs-6-md {
      grid-row-start: 6;
    }
    .grid-re-6-md {
      grid-row-end: 7;
    }
    /* Templates */
    .grid-cols-7-md {
      --grid-template-column: repeat(7, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-7-md {
      grid-column: span 7/span 7;
    }
    /* Row expansion */
    .grid-r-7-md {
      grid-row: span 7/span 7;
    }
    /* Cell Column Start/End */
    .grid-cs-7-md {
      grid-column-start: 7;
    }
    .grid-ce-7-md {
      grid-column-end: 8;
    }
    /* Cell Row Start/End */
    .grid-rs-7-md {
      grid-row-start: 7;
    }
    .grid-re-7-md {
      grid-row-end: 8;
    }
    /* Templates */
    .grid-cols-8-md {
      --grid-template-column: repeat(8, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-8-md {
      grid-column: span 8/span 8;
    }
    /* Row expansion */
    .grid-r-8-md {
      grid-row: span 8/span 8;
    }
    /* Cell Column Start/End */
    .grid-cs-8-md {
      grid-column-start: 8;
    }
    .grid-ce-8-md {
      grid-column-end: 9;
    }
    /* Cell Row Start/End */
    .grid-rs-8-md {
      grid-row-start: 8;
    }
    .grid-re-8-md {
      grid-row-end: 9;
    }
    /* Templates */
    .grid-cols-9-md {
      --grid-template-column: repeat(9, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-9-md {
      grid-column: span 9/span 9;
    }
    /* Row expansion */
    .grid-r-9-md {
      grid-row: span 9/span 9;
    }
    /* Cell Column Start/End */
    .grid-cs-9-md {
      grid-column-start: 9;
    }
    .grid-ce-9-md {
      grid-column-end: 10;
    }
    /* Cell Row Start/End */
    .grid-rs-9-md {
      grid-row-start: 9;
    }
    .grid-re-9-md {
      grid-row-end: 10;
    }
    /* Templates */
    .grid-cols-10-md {
      --grid-template-column: repeat(10, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-10-md {
      grid-column: span 10/span 10;
    }
    /* Row expansion */
    .grid-r-10-md {
      grid-row: span 10/span 10;
    }
    /* Cell Column Start/End */
    .grid-cs-10-md {
      grid-column-start: 10;
    }
    .grid-ce-10-md {
      grid-column-end: 11;
    }
    /* Cell Row Start/End */
    .grid-rs-10-md {
      grid-row-start: 10;
    }
    .grid-re-10-md {
      grid-row-end: 11;
    }
    /* Templates */
    .grid-cols-11-md {
      --grid-template-column: repeat(11, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-11-md {
      grid-column: span 11/span 11;
    }
    /* Row expansion */
    .grid-r-11-md {
      grid-row: span 11/span 11;
    }
    /* Cell Column Start/End */
    .grid-cs-11-md {
      grid-column-start: 11;
    }
    .grid-ce-11-md {
      grid-column-end: 12;
    }
    /* Cell Row Start/End */
    .grid-rs-11-md {
      grid-row-start: 11;
    }
    .grid-re-11-md {
      grid-row-end: 12;
    }
    /* Templates */
    .grid-cols-12-md {
      --grid-template-column: repeat(12, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-12-md {
      grid-column: span 12/span 12;
    }
    /* Row expansion */
    .grid-r-12-md {
      grid-row: span 12/span 12;
    }
    /* Cell Column Start/End */
    .grid-cs-12-md {
      grid-column-start: 12;
    }
    .grid-ce-12-md {
      grid-column-end: 13;
    }
    /* Cell Row Start/End */
    .grid-rs-12-md {
      grid-row-start: 12;
    }
    .grid-re-12-md {
      grid-row-end: 13;
    }
    .grid-ce-end-md {
      grid-column-end: -1;
    }
    .grid-re-end-md {
      grid-row-end: -1;
    }
    .grid-ce-auto-md {
      grid-column-end: auto;
    }
    .grid-re-auto-md {
      grid-row-end: auto;
    }
  }
  @media screen and (min-width: 1024px) {
    .grid-lg {
      display: grid;
      grid-gap: var(--grid-gap);
      grid-template-columns: var(--grid-template-column);
    }
    /* Templates */
    .grid-cols-1-lg {
      --grid-template-column: repeat(1, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-1-lg {
      grid-column: span 1/span 1;
    }
    /* Row expansion */
    .grid-r-1-lg {
      grid-row: span 1/span 1;
    }
    /* Cell Column Start/End */
    .grid-cs-1-lg {
      grid-column-start: 1;
    }
    .grid-ce-1-lg {
      grid-column-end: 2;
    }
    /* Cell Row Start/End */
    .grid-rs-1-lg {
      grid-row-start: 1;
    }
    .grid-re-1-lg {
      grid-row-end: 2;
    }
    /* Templates */
    .grid-cols-2-lg {
      --grid-template-column: repeat(2, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-2-lg {
      grid-column: span 2/span 2;
    }
    /* Row expansion */
    .grid-r-2-lg {
      grid-row: span 2/span 2;
    }
    /* Cell Column Start/End */
    .grid-cs-2-lg {
      grid-column-start: 2;
    }
    .grid-ce-2-lg {
      grid-column-end: 3;
    }
    /* Cell Row Start/End */
    .grid-rs-2-lg {
      grid-row-start: 2;
    }
    .grid-re-2-lg {
      grid-row-end: 3;
    }
    /* Templates */
    .grid-cols-3-lg {
      --grid-template-column: repeat(3, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-3-lg {
      grid-column: span 3/span 3;
    }
    /* Row expansion */
    .grid-r-3-lg {
      grid-row: span 3/span 3;
    }
    /* Cell Column Start/End */
    .grid-cs-3-lg {
      grid-column-start: 3;
    }
    .grid-ce-3-lg {
      grid-column-end: 4;
    }
    /* Cell Row Start/End */
    .grid-rs-3-lg {
      grid-row-start: 3;
    }
    .grid-re-3-lg {
      grid-row-end: 4;
    }
    /* Templates */
    .grid-cols-4-lg {
      --grid-template-column: repeat(4, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-4-lg {
      grid-column: span 4/span 4;
    }
    /* Row expansion */
    .grid-r-4-lg {
      grid-row: span 4/span 4;
    }
    /* Cell Column Start/End */
    .grid-cs-4-lg {
      grid-column-start: 4;
    }
    .grid-ce-4-lg {
      grid-column-end: 5;
    }
    /* Cell Row Start/End */
    .grid-rs-4-lg {
      grid-row-start: 4;
    }
    .grid-re-4-lg {
      grid-row-end: 5;
    }
    /* Templates */
    .grid-cols-5-lg {
      --grid-template-column: repeat(5, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-5-lg {
      grid-column: span 5/span 5;
    }
    /* Row expansion */
    .grid-r-5-lg {
      grid-row: span 5/span 5;
    }
    /* Cell Column Start/End */
    .grid-cs-5-lg {
      grid-column-start: 5;
    }
    .grid-ce-5-lg {
      grid-column-end: 6;
    }
    /* Cell Row Start/End */
    .grid-rs-5-lg {
      grid-row-start: 5;
    }
    .grid-re-5-lg {
      grid-row-end: 6;
    }
    /* Templates */
    .grid-cols-6-lg {
      --grid-template-column: repeat(6, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-6-lg {
      grid-column: span 6/span 6;
    }
    /* Row expansion */
    .grid-r-6-lg {
      grid-row: span 6/span 6;
    }
    /* Cell Column Start/End */
    .grid-cs-6-lg {
      grid-column-start: 6;
    }
    .grid-ce-6-lg {
      grid-column-end: 7;
    }
    /* Cell Row Start/End */
    .grid-rs-6-lg {
      grid-row-start: 6;
    }
    .grid-re-6-lg {
      grid-row-end: 7;
    }
    /* Templates */
    .grid-cols-7-lg {
      --grid-template-column: repeat(7, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-7-lg {
      grid-column: span 7/span 7;
    }
    /* Row expansion */
    .grid-r-7-lg {
      grid-row: span 7/span 7;
    }
    /* Cell Column Start/End */
    .grid-cs-7-lg {
      grid-column-start: 7;
    }
    .grid-ce-7-lg {
      grid-column-end: 8;
    }
    /* Cell Row Start/End */
    .grid-rs-7-lg {
      grid-row-start: 7;
    }
    .grid-re-7-lg {
      grid-row-end: 8;
    }
    /* Templates */
    .grid-cols-8-lg {
      --grid-template-column: repeat(8, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-8-lg {
      grid-column: span 8/span 8;
    }
    /* Row expansion */
    .grid-r-8-lg {
      grid-row: span 8/span 8;
    }
    /* Cell Column Start/End */
    .grid-cs-8-lg {
      grid-column-start: 8;
    }
    .grid-ce-8-lg {
      grid-column-end: 9;
    }
    /* Cell Row Start/End */
    .grid-rs-8-lg {
      grid-row-start: 8;
    }
    .grid-re-8-lg {
      grid-row-end: 9;
    }
    /* Templates */
    .grid-cols-9-lg {
      --grid-template-column: repeat(9, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-9-lg {
      grid-column: span 9/span 9;
    }
    /* Row expansion */
    .grid-r-9-lg {
      grid-row: span 9/span 9;
    }
    /* Cell Column Start/End */
    .grid-cs-9-lg {
      grid-column-start: 9;
    }
    .grid-ce-9-lg {
      grid-column-end: 10;
    }
    /* Cell Row Start/End */
    .grid-rs-9-lg {
      grid-row-start: 9;
    }
    .grid-re-9-lg {
      grid-row-end: 10;
    }
    /* Templates */
    .grid-cols-10-lg {
      --grid-template-column: repeat(10, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-10-lg {
      grid-column: span 10/span 10;
    }
    /* Row expansion */
    .grid-r-10-lg {
      grid-row: span 10/span 10;
    }
    /* Cell Column Start/End */
    .grid-cs-10-lg {
      grid-column-start: 10;
    }
    .grid-ce-10-lg {
      grid-column-end: 11;
    }
    /* Cell Row Start/End */
    .grid-rs-10-lg {
      grid-row-start: 10;
    }
    .grid-re-10-lg {
      grid-row-end: 11;
    }
    /* Templates */
    .grid-cols-11-lg {
      --grid-template-column: repeat(11, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-11-lg {
      grid-column: span 11/span 11;
    }
    /* Row expansion */
    .grid-r-11-lg {
      grid-row: span 11/span 11;
    }
    /* Cell Column Start/End */
    .grid-cs-11-lg {
      grid-column-start: 11;
    }
    .grid-ce-11-lg {
      grid-column-end: 12;
    }
    /* Cell Row Start/End */
    .grid-rs-11-lg {
      grid-row-start: 11;
    }
    .grid-re-11-lg {
      grid-row-end: 12;
    }
    /* Templates */
    .grid-cols-12-lg {
      --grid-template-column: repeat(12, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-12-lg {
      grid-column: span 12/span 12;
    }
    /* Row expansion */
    .grid-r-12-lg {
      grid-row: span 12/span 12;
    }
    /* Cell Column Start/End */
    .grid-cs-12-lg {
      grid-column-start: 12;
    }
    .grid-ce-12-lg {
      grid-column-end: 13;
    }
    /* Cell Row Start/End */
    .grid-rs-12-lg {
      grid-row-start: 12;
    }
    .grid-re-12-lg {
      grid-row-end: 13;
    }
    .grid-ce-end-lg {
      grid-column-end: -1;
    }
    .grid-re-end-lg {
      grid-row-end: -1;
    }
    .grid-ce-auto-lg {
      grid-column-end: auto;
    }
    .grid-re-auto-lg {
      grid-row-end: auto;
    }
  }
  @media screen and (min-width: 1280px) {
    .grid-xl {
      display: grid;
      grid-gap: var(--grid-gap);
      grid-template-columns: var(--grid-template-column);
    }
    /* Templates */
    .grid-cols-1-xl {
      --grid-template-column: repeat(1, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-1-xl {
      grid-column: span 1/span 1;
    }
    /* Row expansion */
    .grid-r-1-xl {
      grid-row: span 1/span 1;
    }
    /* Cell Column Start/End */
    .grid-cs-1-xl {
      grid-column-start: 1;
    }
    .grid-ce-1-xl {
      grid-column-end: 2;
    }
    /* Cell Row Start/End */
    .grid-rs-1-xl {
      grid-row-start: 1;
    }
    .grid-re-1-xl {
      grid-row-end: 2;
    }
    /* Templates */
    .grid-cols-2-xl {
      --grid-template-column: repeat(2, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-2-xl {
      grid-column: span 2/span 2;
    }
    /* Row expansion */
    .grid-r-2-xl {
      grid-row: span 2/span 2;
    }
    /* Cell Column Start/End */
    .grid-cs-2-xl {
      grid-column-start: 2;
    }
    .grid-ce-2-xl {
      grid-column-end: 3;
    }
    /* Cell Row Start/End */
    .grid-rs-2-xl {
      grid-row-start: 2;
    }
    .grid-re-2-xl {
      grid-row-end: 3;
    }
    /* Templates */
    .grid-cols-3-xl {
      --grid-template-column: repeat(3, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-3-xl {
      grid-column: span 3/span 3;
    }
    /* Row expansion */
    .grid-r-3-xl {
      grid-row: span 3/span 3;
    }
    /* Cell Column Start/End */
    .grid-cs-3-xl {
      grid-column-start: 3;
    }
    .grid-ce-3-xl {
      grid-column-end: 4;
    }
    /* Cell Row Start/End */
    .grid-rs-3-xl {
      grid-row-start: 3;
    }
    .grid-re-3-xl {
      grid-row-end: 4;
    }
    /* Templates */
    .grid-cols-4-xl {
      --grid-template-column: repeat(4, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-4-xl {
      grid-column: span 4/span 4;
    }
    /* Row expansion */
    .grid-r-4-xl {
      grid-row: span 4/span 4;
    }
    /* Cell Column Start/End */
    .grid-cs-4-xl {
      grid-column-start: 4;
    }
    .grid-ce-4-xl {
      grid-column-end: 5;
    }
    /* Cell Row Start/End */
    .grid-rs-4-xl {
      grid-row-start: 4;
    }
    .grid-re-4-xl {
      grid-row-end: 5;
    }
    /* Templates */
    .grid-cols-5-xl {
      --grid-template-column: repeat(5, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-5-xl {
      grid-column: span 5/span 5;
    }
    /* Row expansion */
    .grid-r-5-xl {
      grid-row: span 5/span 5;
    }
    /* Cell Column Start/End */
    .grid-cs-5-xl {
      grid-column-start: 5;
    }
    .grid-ce-5-xl {
      grid-column-end: 6;
    }
    /* Cell Row Start/End */
    .grid-rs-5-xl {
      grid-row-start: 5;
    }
    .grid-re-5-xl {
      grid-row-end: 6;
    }
    /* Templates */
    .grid-cols-6-xl {
      --grid-template-column: repeat(6, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-6-xl {
      grid-column: span 6/span 6;
    }
    /* Row expansion */
    .grid-r-6-xl {
      grid-row: span 6/span 6;
    }
    /* Cell Column Start/End */
    .grid-cs-6-xl {
      grid-column-start: 6;
    }
    .grid-ce-6-xl {
      grid-column-end: 7;
    }
    /* Cell Row Start/End */
    .grid-rs-6-xl {
      grid-row-start: 6;
    }
    .grid-re-6-xl {
      grid-row-end: 7;
    }
    /* Templates */
    .grid-cols-7-xl {
      --grid-template-column: repeat(7, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-7-xl {
      grid-column: span 7/span 7;
    }
    /* Row expansion */
    .grid-r-7-xl {
      grid-row: span 7/span 7;
    }
    /* Cell Column Start/End */
    .grid-cs-7-xl {
      grid-column-start: 7;
    }
    .grid-ce-7-xl {
      grid-column-end: 8;
    }
    /* Cell Row Start/End */
    .grid-rs-7-xl {
      grid-row-start: 7;
    }
    .grid-re-7-xl {
      grid-row-end: 8;
    }
    /* Templates */
    .grid-cols-8-xl {
      --grid-template-column: repeat(8, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-8-xl {
      grid-column: span 8/span 8;
    }
    /* Row expansion */
    .grid-r-8-xl {
      grid-row: span 8/span 8;
    }
    /* Cell Column Start/End */
    .grid-cs-8-xl {
      grid-column-start: 8;
    }
    .grid-ce-8-xl {
      grid-column-end: 9;
    }
    /* Cell Row Start/End */
    .grid-rs-8-xl {
      grid-row-start: 8;
    }
    .grid-re-8-xl {
      grid-row-end: 9;
    }
    /* Templates */
    .grid-cols-9-xl {
      --grid-template-column: repeat(9, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-9-xl {
      grid-column: span 9/span 9;
    }
    /* Row expansion */
    .grid-r-9-xl {
      grid-row: span 9/span 9;
    }
    /* Cell Column Start/End */
    .grid-cs-9-xl {
      grid-column-start: 9;
    }
    .grid-ce-9-xl {
      grid-column-end: 10;
    }
    /* Cell Row Start/End */
    .grid-rs-9-xl {
      grid-row-start: 9;
    }
    .grid-re-9-xl {
      grid-row-end: 10;
    }
    /* Templates */
    .grid-cols-10-xl {
      --grid-template-column: repeat(10, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-10-xl {
      grid-column: span 10/span 10;
    }
    /* Row expansion */
    .grid-r-10-xl {
      grid-row: span 10/span 10;
    }
    /* Cell Column Start/End */
    .grid-cs-10-xl {
      grid-column-start: 10;
    }
    .grid-ce-10-xl {
      grid-column-end: 11;
    }
    /* Cell Row Start/End */
    .grid-rs-10-xl {
      grid-row-start: 10;
    }
    .grid-re-10-xl {
      grid-row-end: 11;
    }
    /* Templates */
    .grid-cols-11-xl {
      --grid-template-column: repeat(11, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-11-xl {
      grid-column: span 11/span 11;
    }
    /* Row expansion */
    .grid-r-11-xl {
      grid-row: span 11/span 11;
    }
    /* Cell Column Start/End */
    .grid-cs-11-xl {
      grid-column-start: 11;
    }
    .grid-ce-11-xl {
      grid-column-end: 12;
    }
    /* Cell Row Start/End */
    .grid-rs-11-xl {
      grid-row-start: 11;
    }
    .grid-re-11-xl {
      grid-row-end: 12;
    }
    /* Templates */
    .grid-cols-12-xl {
      --grid-template-column: repeat(12, minmax(0, 1fr));
    }
    /* Column expansion */
    .grid-c-12-xl {
      grid-column: span 12/span 12;
    }
    /* Row expansion */
    .grid-r-12-xl {
      grid-row: span 12/span 12;
    }
    /* Cell Column Start/End */
    .grid-cs-12-xl {
      grid-column-start: 12;
    }
    .grid-ce-12-xl {
      grid-column-end: 13;
    }
    /* Cell Row Start/End */
    .grid-rs-12-xl {
      grid-row-start: 12;
    }
    .grid-re-12-xl {
      grid-row-end: 13;
    }
    .grid-ce-end-xl {
      grid-column-end: -1;
    }
    .grid-re-end-xl {
      grid-row-end: -1;
    }
    .grid-ce-auto-xl {
      grid-column-end: auto;
    }
    .grid-re-auto-xl {
      grid-row-end: auto;
    }
  }
`
