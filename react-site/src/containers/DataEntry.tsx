import React from 'react'

/*
import Form from "react-jsonschema-form";
import { JSONSchema6 } from 'json-schema'
import DailyZ from 'containers/DailyZ'

const schema : JSONSchema6 = {
  type: "object",
  properties: {
    date: {type: "string", title: "Date", format: "date", default: new Date() },
  }
};

const log = (type:any) => console.log.bind(console, type);

function processChange(e:any) {
  console.log("Change Date:",e.formData.date)
}
*/
function key(date?:string,input?:string):string {
  if(!date) {
    return 'no-date'
  }
  if(!input) {
    return 'select-input'
  }
  return input
}
export default ({date,target}:{date:any,target:any}) => (
  /*
    No index signature with a parameter of type 'string' was found on type '{ 'no-date': Element; 'select-input': Element; 'daily-z': Element; }'.
  <div>
    {{
      'no-date':
        <Form schema={schema}
          onChange={processChange}
          onSubmit={processChange}
          onError={log("errors")} >
          <div />
        </Form>,
      'select-input':
        <div>
          Select input
        </div>,
      'daily-z':
        <DailyZ />,
    }[key(date,target)]}
  </div>
  */
  <div>
    <h1>Hey</h1>
    {(():any => {
      const k=key(date,target)
      console.log("KEY=",k)
      /*
      switch(k) {
        case 'no-date':
          return
            <Form schema={schema}
              onChange={processChange}
              onSubmit={processChange}
              onError={log("errors")} >
              <div />
            </Form>;
            break;
        case 'select-input':
          console.log("I be here!")
          return
            <div>
              Select input
            </div>;
        case 'daily-z':
            return
              <DailyZ />;
        default:
          console.log("I be here 2!")
          return null;
        }
        */
      console.log("I be here 3!")
      return <div>"Hey3"</div>
    })()}
    <div>Hey2</div>
  </div>

)
