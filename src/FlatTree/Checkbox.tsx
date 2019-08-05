import * as React from 'react';
type NativeCheckboxProps = {
  indeterminate?: boolean;
};
class NativeCheckbox extends React.PureComponent<
  NativeCheckboxProps & React.HTMLProps<HTMLInputElement>,
  {}
> {
  // tslint:disable-next-line:no-any
  checkbox: any;
  componentDidMount() {
    this.updateDeterminateProperty();
  }
  componentDidUpdate() {
    this.updateDeterminateProperty();
  }
  updateDeterminateProperty() {
    const { indeterminate } = this.props;
    this.checkbox.indeterminate = indeterminate;
  }
  render() {
    const props = { ...this.props };
    // Remove property that does not exist in HTML
    delete props.indeterminate;
    return (
      <input
        {...props}
        ref={c => {
          this.checkbox = c;
        }}
        type="checkbox"
      />
    );
  }
}
export default NativeCheckbox;
