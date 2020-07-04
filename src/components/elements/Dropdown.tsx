import * as React from 'react';
import styled from 'styled-components';
import { Place } from '../maps/ViewsMap';

const Input = styled.input`
//   width: 97.4%;

font-family: Segoe UI;
  width: 10%;
  height: 100%;
  border: 1px solid #ddd;
  outline: none;
  padding: 0px 20px;
  color: #666;
  position: absolute;
  left: 0px;
  top: 0px;
  font-size: 13px;
  ::placeholder {
    color: #bbb;
  }
`;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
//   background-color: white;
  flex: 1;
`;

const List = styled.ul`
font-family: Segoe UI;
position: absolute;
left: 0px;
top: 40px;
  list-style-type: none;
  padding: 6px 20px;
  background-color: white;
  margin-top: 0px;
`;

const Item = styled.li`

font-family: Segoe UI;
  padding: 4px 0px;
  color: #666;
  font-size: 13px;
  cursor: pointer;
`;

export interface Props {
  options: Place[];
  onSearch: (evt: any) => void;
  onSelectItem: (item: number) => void;
}

class Dropdown extends React.Component<Props, {}> {

  public state = {
    value: ''
  }

  private onSelectItem = (index: number) => {
    this.setState({
      value: ''
    });

    this.props.onSelectItem(index);
  };

  private onSearch = ({ target }: any) => {
    this.setState({
      value: target.value
    });

    if (target.value.length > 2) {
      this.props.onSearch(target.value);
    }
  };

  public render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <Container>
        <Input onChange={this.onSearch} value={value} placeholder="Search.."/>
        {
          value.length > 2 && (
            <List>
              {
                options.map((el, index) => (
                  <Item
                    key={index}
                    onClick={this.onSelectItem.bind(this, index)}
                  >
                    {el.name}
                  </Item>
                ))
              }
            </List>
          )
        }
      </Container>
    );
  }
}

export default Dropdown;
