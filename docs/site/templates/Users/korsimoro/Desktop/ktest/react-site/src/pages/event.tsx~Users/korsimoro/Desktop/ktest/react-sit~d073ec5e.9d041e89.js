(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(482),n=i(483),o=i(484),s=i(485),a=i(486),p=i(487);t.schemas={event:r.schema,person:o.schema,"working-group":n.schema,"project-or-product":a.schema,organization:s.schema,publication:p.schema}},482:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"http://example.com/publication#",$schema:"http://json-schema.org/draft-04/schema#",description:"Event",type:"object",required:[],additionalProperties:!1,properties:{Name:{type:"string",description:""},Description:{type:"string",description:""},Website:{type:"string",format:"url",description:""},Category:{type:"string",format:"url",description:"",enum:["Size","Identity","Telco"]},"Host Organization":{type:"string",description:""},People:{type:"string",description:""},Audience:{type:"string",format:"url",description:"",enum:["C suite decision makers","consumer technology vendors","enterprise technology vendors","general public","government workers","legislators","marginalized and diadvantaged communities","product users","researchers","creators"]},Partners:{type:"string",description:""},"Working Group":{type:"string",description:""},Tags:{type:"array",items:{type:"string"}},Frequency:{type:"string",description:"how often the event occurs",enum:["daily","weekly","monthly","quarterly","other"]},Date:{type:"string",format:"date",description:""},"Location(s)":{type:"array",description:"",items:{type:"string"}},"Github Profile":{type:"string",format:"url",description:""},"Relevant Publications":{type:"string",description:""}}}},483:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"http://example.com/publication#",$schema:"http://json-schema.org/draft-04/schema#",description:"Working Group",type:"object",required:[],additionalProperties:!1,properties:{Name:{type:"string",description:""},Description:{type:"string",description:""},URL:{type:"string",format:"url",description:""},Category:{type:"string",format:"url",description:"",enum:["Discussion Group","w/in SDO working on a formal standard","Community Group","w/in (Inter)Government Organization","w/in a Trade Association"]},"Parent Org":{type:"string",description:""},People:{type:"string",description:""},"Meeting Frequency":{type:"string",description:"",enum:["weekly","bi-weekly","monthly","quarterly","semi-annually","annually"]},"Date Founded":{type:"string",format:"date",description:""},"Date Ended":{type:"string",format:"date",description:""},Purpose:{type:"string",description:"",enum:["education","human rights","usability","tech interoperability","governance","certification and compliance","transparancy and accountability"]},"Digital Harms Addressed":{type:"string",enum:["AGGREGATION","APPROPRIATION","BLACKMAIL","BREACH OF CONFIDENTIALITY","DECISIONAL INTERFERENCE","DISCLOSURE","DISTORTION","EXCLUSION","EXPOSURE","IDENTIFICATION","INCREASED ACCESSIBILITY","INSECURITY","INTERROGATION","INTRUSION","SECONDARY USE","SURVEILLANCE"]},"Tech Focus":{type:"string",enum:["Identity","Data Mobility","Terms Management","Information Sharing Control","Data Storage"]},Activities:{type:"string",description:""},Status:{type:"string",description:"",enum:["active","inactive"]},IPR:{type:"string",description:""},"Github Profile":{type:"string",format:"url",description:""},"Relevant Standards":{type:"string",description:""}}}},484:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"http://example.com/publication#",$schema:"http://json-schema.org/draft-04/schema#",description:"Person",type:"object",required:[],additionalProperties:!1,properties:{Name:{type:"string",description:""},Bio:{type:"string",description:""},Website:{type:"string",format:"url",description:""},Organization:{type:"string",description:""},"Working Group":{type:"string",description:""},Tags:{type:"array",items:{type:"string"}},Location:{type:"string",description:""},"Twitter Profile":{type:"string",format:"url",description:""},"LinkedIn Profile":{type:"string",format:"url",description:""},"Github Profile":{type:"string",format:"url",description:""}}}},485:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"https://example.com/organization.schema.json",$schema:"http://json-schema.org/draft-07/schema#",description:"Organization",type:"object",properties:{"Org Name":{type:"string",title:"Organization Name"},About:{type:"string"},Website:{type:"string",format:"url"},"Org Type":{type:"string",enum:["Coalition or Network","Government Department","Research Lab or Center","University","Standards Development Organization","TradeAssociation","University Department","Non Governmental Organization","Part of Supra-National Government","Government","Cooperative"]},Sector:{type:"string",enum:["non-profit","for-profit","government","academic"]},Purpose:{type:"string",enum:["education","human rights","usability","tech interoperability","governance","certification and compliance","transparency and accountability","consumer support","health care"]},Activities:{type:"string",enum:["advocacy","certification","compliance auditing","events and convening","formal training and classes","funding","incubation","movement building","outreach","policy development","publication","regulation","research","software development","standard development","service provider"]},"Parent Org":{type:"string"},"Me2B Relationship":{type:"string",enum:["Certification Candidate","collaborating org","member","potential collaborator","out of scope","funder","affiliates"]},"Key People":{type:"string",enum:["Board People","CEO or ED","Other Leadership","Working group chair","Technical editor","Employee"]},Audience:{type:"string",enum:["C suite decision makers","consumer technology vendors","enterprise technology vendors","general public","government workers","legislators","marginalized and disadvantage communities","product users","researchers"]},Partners:{type:"array",maxItems:5,items:{type:"string"}},Tags:{type:"array",items:{type:"string"}},"Date Founded":{type:"string",format:"date"},"Date Ended":{type:"string",format:"date"},"Digital Harms Addressed":{type:"string",enum:["AGGREGATION","APPROPRIATION","BLACKMAIL","BREACH OF CONFIDENTIALITY","DECISIONAL INTERFERENCE","DISCLOSURE","DISTORTION","EXCLUSION","EXPOSURE","IDENTIFICATION","INCREASED ACCESSIBILITY","INSECURITY","INTERROGATION","INTRUSION","SECONDARY USE","SURVEILLANCE"]},"Tech Focus":{type:"string",enum:["Identity","Data Mobility","Terms Management","Information Sharing Control","Data Storage"]},Status:{type:"string",enum:["active","inactive","merged"]},"Annual Budget":{type:"string"},Funding:{type:"string"},Scope:{type:"string",enum:["global","national","regional","local","other"]},"Location(s)":{type:"string"},"Products and or services":{type:"array",items:{type:"string"}},"Twitter Profile":{type:"string",format:"url"},"LinkedIn Profile":{type:"string",format:"url"},"Github Profile":{type:"string",format:"url"},"Relevant Publications":{type:"string"}}}},486:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"http://example.com/publication#",$schema:"http://json-schema.org/draft-04/schema#",description:"Project or Product",type:"object",required:[],additionalProperties:!1,properties:{Name:{type:"string",description:""},Description:{type:"string",description:""},URL:{type:"string",format:"url",description:""},Category:{type:"string",format:"url",description:"",enum:["open source","pilot","proof of concept","research","service","other"]},"Parent Org":{type:"string",description:""},People:{type:"string",description:""},Audience:{type:"string",description:"",enum:["C suite decision makers","consumer technology vendors","enterprise technology vendors","general public","government workers","legislators","marginalizaed and disadvantaged communities","product users","researchers"]},Partners:{type:"string",description:""},"Working Group":{type:"string",description:""},Tags:{type:"array",items:{type:"string"}},License:{type:"string",description:""},"Version or Edition":{type:"string",description:""},"Date Begun":{type:"string",format:"date",description:""},"Date Ended":{type:"string",format:"date",description:""},Purpose:{type:"string",description:"",enum:["education","human rights","usability","tech interoperability","governance","certification and compliance","transparancy and accountability"]},"Digital Harms Addressed":{type:"string",enum:["AGGREGATION","APPROPRIATION","BLACKMAIL","BREACH OF CONFIDENTIALITY","DECISIONAL INTERFERENCE","DISCLOSURE","DISTORTION","EXCLUSION","EXPOSURE","IDENTIFICATION","INCREASED ACCESSIBILITY","INSECURITY","INTERROGATION","INTRUSION","SECONDARY USE","SURVEILLANCE"]},"Supported Identity Technologies":{type:"array",description:"",items:{type:"string"}},Activities:{type:"string",description:""},Status:{type:"string",description:""},"Me2B Participation":{type:"string",description:""},"Terms of Service":{type:"string",description:""},"Github Profile":{type:"string",format:"url",description:""},"Relevant Publications":{type:"array",description:"",items:{type:"string"}}}}},487:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.schema={definitions:{},$id:"http://example.com/publication#",$schema:"http://json-schema.org/draft-04/schema#",description:"Publication",type:"object",required:[],additionalProperties:!1,properties:{Name:{type:"string",description:""},About:{type:"string",description:""},URL:{type:"string",format:"url",description:""},"Publication Type":{type:"string",description:"",enum:["blog post","book","event summary or output","glossary","journal","legal document","license","magazine","news article","op ed","paper","podcast","report","standard","terms of service","Trust Framework","video"]},"Sponsoring Org":{type:"string",description:""},"Author(s)/Editor(s)":{type:"array",description:"",items:{type:"string"}},Audience:{type:"string",description:"",enum:["C suite decision makers","consumer technology vendors","enterprise technology vendors","general public","government workers","legislators","marginalized and disadvantage communities","product users","researchers"]},"Working Group":{type:"string",description:""},Tags:{type:"array",description:"",items:{type:"string"}},License:{type:"string",description:""},"Volume Frequency":{type:"string",description:""},"Version or Edition":{type:"string",description:""},Date:{type:"string",format:"date",description:""},Sector:{type:"string",description:"",enum:[]},Purpose:{type:"string",description:"",enum:["education","human rights","usability","tech interoperability","governance","certification and compliance","transparancy and accountability"]},"Digital Harms Addressed":{type:"string",enum:["AGGREGATION","APPROPRIATION","BLACKMAIL","BREACH OF CONFIDENTIALITY","DECISIONAL INTERFERENCE","DISCLOSURE","DISTORTION","EXCLUSION","EXPOSURE","IDENTIFICATION","INCREASED ACCESSIBILITY","INSECURITY","INTERROGATION","INTRUSION","SECONDARY USE","SURVEILLANCE"]},"Tech Focus":{type:"string",enum:["Identity","Data Mobility","Terms Management","Information Sharing Control","Data Storage"]},Jurisdiction:{type:"string"},"Github Profile":{type:"string",format:"url"}}}}}]);