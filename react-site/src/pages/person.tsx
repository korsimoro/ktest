import React from 'react'
import Form from "react-jsonschema-form";
import { schema } from '../schema/person'

const log = (type:any) => console.log.bind(console, type);
function recordData(e:any) {
  console.log("Record Data",e)
}
export default () => (
  <Form schema={schema}
    onChange={log("changed")}
    onSubmit={recordData}
    onError={log("errors")} />
)
