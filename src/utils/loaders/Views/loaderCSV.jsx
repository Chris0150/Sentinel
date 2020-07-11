import React from 'react'
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

const CSVReader1 = (props) => {

  const { onUploadFile } = props;

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

    return (
      <>
        <CSVReader
          noClick
          noDrag
          ref={buttonRef}
          onError={handleOnError}
          onFileLoad={onUploadFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={handleOpenDialog}
                style={{
                  color: "hsla(0,0%,100%,0.6)",
                  borderStyle: "dotted",
                  height: 40,
                  width: '65%',
                  marginTop: 10,
                  marginLeft: 30,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  cursor: "pointer"
                }}
              >
                + Add Layer
              </button>
           
            </aside>
          )}
        </CSVReader>
      </>
    )
  
}

export default CSVReader1;