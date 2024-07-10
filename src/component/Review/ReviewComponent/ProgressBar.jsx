const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    const containerStyles = {
      height: 11,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      transition: 'width 1s ease-in-out',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      // textAlign: 'right'
      display: "flex",
    alignItems: "center",
    /* text-align: end; */
    justifyContent: "end",
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontSize:"10px",
      fontWeight: 'bold',
    }
  
    return (
      <div style={containerStyles} className="">
        <div style={fillerStyles}>
          <span style={labelStyles}>{ ` ${ completed === 0 ? '' :completed+"%"}`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;