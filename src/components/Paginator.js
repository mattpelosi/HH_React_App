import React from "react";
import "../css/paginator.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };

    const { totalColors = null, pageLimit = 30, pageNeighbors = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalColors = typeof totalColors === "number" ? totalColors : 0;

    this.totalPages = Math.ceil(this.totalColors / this.pageLimit);

    this.pageNeighbors =
      typeof pageNeighbors === "number"
        ? Math.max(0, Math.min(pageNeighbors, 2))
        : 0;
  
  }

  componentDidMount() {
    this.goToPage(1);
  }

  goToPage = page => {
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginatorData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit
    };
    this.setState(
      { currentPage: currentPage },
      this.props.onPageChange(paginatorData)
    );
  };

  handleClick = page => {
    this.goToPage(page);
  };

  handlePageLeft = () => {
    this.goToPage(this.state.currentPage - this.pageNeighbors * 2 - 1);
  };

  handlePageRight = () => {
    this.goToPage(this.state.currentPage + this.pageNeighbors * 2 + 1);
  };

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  getPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbors = this.pageNeighbors;

    const totalNumbers = this.pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

      let pages = this.range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  };

  render() {
    if (!this.totalColors || this.totalPages === 1) return null;

    const { currentPage } = this.state;

    const pages = this.getPageNumbers();

    return (
      <React.Fragment>
        <div>
          <ul className="paginator">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a className="page-link" onClick={this.handlePageLeft}>
                      <span>&laquo;</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a className="page-link" onClick={this.handlePageRight}>
                      <span>&raquo;</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => this.handleClick(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Paginator;
