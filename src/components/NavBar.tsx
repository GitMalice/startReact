interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
}

function NavBar({ brandName, imageSrcPath }: NavBarProps) {
  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            width="70"
            height="70"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bolder fs-4 p-3">{brandName}</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
