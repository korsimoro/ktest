import React from 'react'
import Form from "react-jsonschema-form";
import { JSONSchema6 } from 'json-schema'

const schema : JSONSchema6 = {
  title: "Daily-Z",
  type: "object",
  required: ["date"],
  properties: {
    date: {type: "string", title: "Date", format: "date", default: new Date() },
    opening_balance: { type:"integer", title:"Opening Balance" },
    dept_01: { type:"integer", title:"DEPT01" },
    dept_02: { type:"integer", title:"DEPT02" },
    dept_03: { type:"integer", title:"DEPT03" },
    dept_04: { type:"integer", title:"DEPT04" },
    dept_05: { type:"integer", title:"DEPT05" },
    dept_06: { type:"integer", title:"DEPT06" },
    dept_07: { type:"integer", title:"DEPT07" },
    dept_08: { type:"integer", title:"DEPT08" },
    gross_total_qt: { type:"integer", title:"GROSS TOTAL QT" },
    gross_total: { type:"integer", title:"GROSS TOTAL" },
    net_total_no: { type:"integer", title:"NET TOTAL No" },
    net_total: { type:"integer", title:"NET TOTAL" },
    cash_indw: { type:"integer", title:"CASH-INDW" },
    charge_indw: { type:"integer", title:"CHARGE-INDW" },
    cash_no: { type:"integer", title:"CASH No" },
    cash: { type:"integer", title:"CASH" },
    charge_no: { type:"integer", title:"CHARGE No" },
    charge: { type:"integer", title:"CHARGE" },
    ra: { type:"integer", title:"RA" },
    po: { type:"integer", title:"PO" },
    percent: { type:"integer", title:"%+" },
    notes: { type:"string", title:"Notes" }
  }
};

const log = (type:any) => console.log.bind(console, type);

import Airtable from "airtable"
function reportDailyZ(e:any) {
  console.log("ZXY")
  const airtable = new Airtable({ apiKey: 'key5R2PL5TnXVyUCF' })
    .base('tblicKIdlBRQ2CgIq')('Daily')

  console.log("ABC",e.formData)
  const date = e.formData.date
  console.log("DEF",date)
  const data = airtable.select({
    filterByFormula:'{Date_for_Zapier}="'+date+'"'
  }).firstPage().then((x:any) => {
    console.log("X:",x)
  }).catch((y:any) => {
    console.log("Y:",y)
  })

  console.log("AT:",airtable,date,data)
/*
  airtable.list().then((resp:any) => {
    console.log(resp)
  })
*/
  console.log("Report",e)
}
function processChange(e:any) {
  console.log("Change:",e)
}
export default () => (
  <Form schema={schema}
    onChange={processChange}
    onSubmit={reportDailyZ}
    onError={log("errors")} />
)
