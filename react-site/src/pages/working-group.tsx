import React from 'react'
import Form from "react-jsonschema-form";
import { schemas } from 'twiki-schema'

const log = (type:any) => console.log.bind(console, type);
function recordData(e:any) {
  console.log("Record Data",e)
}
export default () => (
  <Form schema={schemas['working-group']}
    onChange={log("changed")}
    onSubmit={recordData}
    onError={log("errors")} />
)
