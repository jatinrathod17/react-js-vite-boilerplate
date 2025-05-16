import { Dropdown } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';

const Header = () => {
  const displayDropdown = false;

  return (
    <div className="header">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <div className="logo-wrapper">
          <img src={Logo} alt="Mathworks" />
        </div>
        {displayDropdown && (
          <Dropdown>
            <Dropdown.Toggle variant="link" id="user-avatar" className="user-avatar">
              <div className="avatar">
                <Person />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </div>
  );
};

export default Header;
